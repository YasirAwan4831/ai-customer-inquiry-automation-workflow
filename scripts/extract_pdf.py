"""Converts the source PDF into structured JSON (content/research.json).
Usage: python3 scripts/extract_pdf.py <pdf> [out.json]
Block types: h1, h2, h3, p, li, table(rows), callout(title, lines), flowbox(lines)"""
import sys, re, json, pdfplumber

SRC = sys.argv[1]
OUT = sys.argv[2] if len(sys.argv) > 2 else "content/research.json"
JUNK = re.compile(r"^(Zayan Soft Tech AI Automation Internship|Muhammad Yasir \| (Why Does a Business Need AI Automation\?|Practical Task 02: AI Customer Inquiry Automation Workflow) Page \d+)")
SECT = re.compile(r"^(\d{1,2})\.\s+(\S.*)$")
SUB = re.compile(r"^(\d{1,2}\.\d{1,2})\s+(\S.*)$")
BORDER = (0.773, 0.816, 0.867)

def clean(s):
    return re.sub(r"\s+", " ", (s or "").replace("\u2010", "-")).strip()

def near(c, ref):
    return isinstance(c, (tuple, list)) and len(c) == 3 and all(abs(a - b) < 0.02 for a, b in zip(c, ref))

def families(tables):
    """Cluster pdfplumber tables that touch vertically and overlap horizontally."""
    fam = []
    for t in sorted(tables, key=lambda t: t.bbox[1]):
        b = t.bbox
        for f in fam:
            if b[1] - f["bbox"][3] < 5 and b[0] < f["bbox"][2] and b[2] > f["bbox"][0]:
                fb = f["bbox"]; f["bbox"] = (min(fb[0], b[0]), fb[1], max(fb[2], b[2]), max(fb[3], b[3])); break
        else:
            fam.append(dict(bbox=b))
    return fam

def build_table(page, bbox):
    x0, y0, x1, y1 = bbox
    rects = [r for r in page.rects if r["x0"] >= x0 - 3 and r["x1"] <= x1 + 3 and r["top"] >= y0 - 3 and r["bottom"] <= y1 + 3]
    seps = sorted({round(r["top"], 0) for r in rects if near(r.get("non_stroking_color"), BORDER) and r["height"] < 1.2 and r["x1"] - r["x0"] > 30})
    cuts = []
    for s in seps:
        if not cuts or s - cuts[-1] > 2: cuts.append(s)
    bounds = [y0 - 3] + [c for c in cuts if y0 < c < y1] + [y1 + 3]
    xs = sorted({round(r["x0"]) for r in rects if r["x1"] - r["x0"] > 25 and r["height"] > 8})
    cols = []
    for x in xs:
        if not cols or x - cols[-1] > 8: cols.append(x)
    words = page.crop((max(0, x0 - 1), y0 - 1, min(page.width, x1 + 1), y1 + 1)).extract_words(keep_blank_chars=False, use_text_flow=False)
    rows = []
    for a, b in zip(bounds, bounds[1:]):
        band = [w for w in words if a <= (w["top"] + w["bottom"]) / 2 < b]
        if not band: continue
        cells = [[] for _ in cols] if cols else [[]]
        for w in sorted(band, key=lambda w: (round(w["top"] / 3), w["x0"])):
            ci = 0
            for i, cx in enumerate(cols):
                if w["x0"] >= cx - 4: ci = i
            cells[ci].append(w["text"])
        rows.append([clean(" ".join(c)) for c in cells])
    return rows, len(cols)

def page_blocks(page, pno):
    tabs = page.find_tables()
    fams = families(tabs)
    out = []
    for f in fams:
        rows, ncols = build_table(page, f["bbox"])
        rows = [r for r in rows if any(r)]
        if not rows: continue
        if ncols <= 1 or len(rows[0]) == 1:
            lines = [r[0] for r in rows]
            if len(lines) <= 2 and len(lines[0]) < 70 and len(rows) <= 2 and (len(lines) == 1 or len(lines[1]) < 70) and f["bbox"][2] - f["bbox"][0] < 350:
                out.append((f["bbox"][1], dict(type="flowbox", lines=lines, page=pno)))
            else:
                out.append((f["bbox"][1], dict(type="callout", title=lines[0], lines=lines[1:], page=pno)))
        else:
            out.append((f["bbox"][1], dict(type="table", rows=rows, page=pno)))
    boxes = [f["bbox"] for f in fams]
    def outside(o):
        if o.get("object_type") != "char": return True
        cx, cy = (o["x0"] + o["x1"]) / 2, (o["top"] + o["bottom"]) / 2
        return not any(b[0] - 2 <= cx <= b[2] + 2 and b[1] - 2 <= cy <= b[3] + 2 for b in boxes)
    prev = None
    for l in page.filter(outside).extract_text_lines(return_chars=True):
        t = clean(l["text"])
        if not t or JUNK.match(t): continue
        chars = [c for c in l["chars"] if c["text"].strip()]
        size = sum(c["size"] for c in chars) / max(1, len(chars))
        bold = sum("Bold" in c["fontname"] for c in chars) > 0.6 * max(1, len(chars))
        gap = l["top"] - prev if prev is not None else 99
        prev = l["bottom"]
        out.append((l["top"], dict(type="line", text=t, size=round(size, 1), bold=bold, gap=gap, page=pno)))
    out.sort(key=lambda i: i[0])
    return [b for _, b in out]

pdf = pdfplumber.open(SRC)
blocks = []
for pno, page in enumerate(pdf.pages, start=1):
    if pno > 2: blocks += page_blocks(page, pno)

content, cur = [], None
def flush():
    global cur
    if cur: content.append(cur); cur = None
for b in blocks:
    if b["type"] != "line":
        flush(); content.append(b); continue
    t = b["text"]
    if re.fullmatch(r"[→▼\s]+", t): flush(); content.append(dict(type="arrow", page=b["page"])); continue
    if b["bold"] and b["size"] >= 15 and (SECT.match(t) or t == "Executive Summary"):
        flush(); content.append(dict(type="h1", text=t, page=b["page"])); continue
    if b["bold"] and b["size"] >= 15 and content and content[-1]["type"] == "h1" and not SECT.match(t):
        content[-1]["text"] += " " + t; continue
    if b["bold"] and SUB.match(t) and b["size"] >= 12:
        flush(); content.append(dict(type="h2", text=t, page=b["page"])); continue
    if t.startswith("•"):
        flush(); cur = dict(type="li", text=t.lstrip("• ").strip(), page=b["page"]); continue
    if cur and b["gap"] < 7.5 and not b["bold"]:
        cur["text"] += " " + t; continue
    flush()
    if b["bold"] and len(t) < 90 and b["size"] >= 10: content.append(dict(type="h3", text=t, page=b["page"]))
    else: cur = dict(type="p", text=t, page=b["page"])
flush()

res = []
for c in content:
    if c["type"] == "arrow": continue
    if c["type"] == "table" and res and res[-1]["type"] == "table" and c["rows"][0] == res[-1]["rows"][0]:
        res[-1]["rows"].extend(c["rows"][1:]); continue
    if c["type"] == "table" and res and res[-1]["type"] == "table" and c["page"] == res[-1]["page"] + 1 and len(c["rows"][0]) == len(res[-1]["rows"][0]) and not any(k in c["rows"][0][0] for k in ("Business", "Stage")) and False:
        pass
    res.append(c)
json.dump(res, open(OUT, "w"), ensure_ascii=False, indent=1)
from collections import Counter
print(Counter(c["type"] for c in res))

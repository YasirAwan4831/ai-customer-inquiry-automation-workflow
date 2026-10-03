"""Builds content/document.json from content/research.json (output of extract_pdf.py).
Usage: python3 scripts/build_content.py"""
import json, re, subprocess, collections
import pdfplumber
SRC = "source/research.pdf"
raw = json.load(open("content/research.json"))
CALLOUTS = ["Scope and Accuracy Note", "A Designed Solution, Not a Case Report", "Documentation Note", "What This Scenario Proves",
            "Testing Observation", "Supporting Employees, Not Replacing Them", "Core Rule"]
def slug(s): return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")

def prompt_text():
    """The master prompt, re-read from the PDF so line breaks are kept."""
    pdf = pdfplumber.open(SRC)
    lines, on = [], False
    for pno in (6, 7):
        for l in pdf.pages[pno].extract_text_lines():
            t = re.sub(r"\s+", " ", l["text"]).strip()
            if re.match(r"^(Zayan Soft Tech AI|Muhammad Yasir \|)", t): continue
            if t == "ROLE": on = True
            if t.startswith("6.3 "): on = False
            if on: lines.append(t)
    head = re.compile(r"^[A-Z][A-Z ]{3,}$")
    start = re.compile(r"^(- |\d\. |Business (name|type):|Main services:|Typical customers:|Approved information:|Channel:|Customer message:|CUSTOMER RESPONSE:|INQUIRY CLASSIFICATION:|LEAD STATUS:|EXTRACTED INFORMATION:|ESCALATE TO HUMAN:|SUGGESTED NEXT ACTION:|Tone:)")
    out, fresh = [], False
    for t in lines:
        if head.match(t): out += ["", t]; fresh = True
        elif start.match(t) or not out or fresh: out.append(t); fresh = False
        else: out[-1] += " " + t
    return "\n".join(out).strip()

blocks, i = [], 0
for b in raw:
    t = b["type"]
    if t == "table":
        rows = [r for r in b["rows"] if any(r)]
        cell = " ".join(rows[0]).strip() if len(rows) == 1 else ""
        title = next((c for c in CALLOUTS if cell.startswith(c)), None)
        if title:
            body = cell[len(title):].strip()
            items = [x.strip() for x in re.split(r"\s*•\s*", body) if x.strip()]
            if "•" in body:
                lead = "" if body.startswith("•") else items.pop(0)
                blocks.append(dict(type="callout", title=title, text=lead, items=items))
            else: blocks.append(dict(type="callout", title=title, text=body, items=[]))
            continue
        if len(rows) == 1 and cell.startswith("ROLE"): blocks.append(dict(type="prompt")); continue
        if len(rows) == 1 and cell.startswith("NEVER INVENT"): continue
        if len(rows) == 1: continue
        if rows[0][0] == "Customer Message": blocks.append(dict(type="qa", rows=rows)); continue
        if rows[0][0].startswith("AI Response") and blocks and blocks[-1]["type"] == "qa": blocks[-1]["rows"].extend(rows); continue
        if rows[0][0] == "Business Name": blocks.append(dict(type="keyvalue", rows=rows)); continue
        if rows[0][0] == "1" and len(rows[0]) == 2: blocks.append(dict(type="numbered", rows=rows)); continue
        if rows[0][0] == "# Customer Question":
            fixed = [["#", "Customer Question", "Inquiry Type", "Customer Intent"]]
            for r in rows[1:]:
                m = re.search(r"\s(\d)\s", r[0]); n = m.group(1) if m else ""
                fixed.append([n, re.sub(r"\s\d\s", " ", r[0], count=1)] + r[1:])
            rows = fixed
        if rows[0][0] == "# Inquiry Type":
            rows[0] = ["# Inquiry Type", *rows[0][1:]]
        prev = blocks[-1] if blocks else None
        if prev and prev["type"] == "table" and prev["rows"][0] == rows[0]: prev["rows"].extend(rows[1:]); continue
        blocks.append(dict(type="table", rows=rows))
    elif t == "callout": blocks.append(dict(type="flowraw", text=" ".join([b["title"], *b["lines"]])))
    elif t == "flowbox": blocks.append(dict(type="flowbox", text=" ".join(b["lines"])))
    else: blocks.append({k: v for k, v in b.items() if k != "page"} | dict(page=b["page"]))
# the same prompt table can continue on the next page; keep a single prompt block
dedup = []
for b in blocks:
    if b["type"] == "prompt" and dedup and dedup[-1]["type"] == "prompt": continue
    dedup.append(b)
blocks = dedup
# sections
sections, cur = [], None
for b in blocks:
    if b["type"] == "h1":
        m = re.match(r"^(\d+)\.\s+(.*)$", b["text"])
        cur = dict(id=slug(b["text"]), number=m.group(1), title=m.group(2), page=b["page"], blocks=[]); sections.append(cur)
    elif cur is not None:
        if b["type"] == "h2":
            m = re.match(r"^(\d+\.\d+)\s+(.*)$", b["text"])
            b = dict(type="h2", id=slug(b["text"]), number=m.group(1), text=m.group(2))
        cur["blocks"].append(b)
# post-process per section
PROMPT = prompt_text()
for s in sections:
    out = []
    for b in s["blocks"]:
        if s["number"] == "9" and b["type"] in ("flowraw", "flowbox"):
            if not any(o["type"] == "workflow" for o in out): out.append(dict(type="workflow", id="main"))
            continue
        if b["type"] in ("flowbox", "flowraw"):
            if out and out[-1]["type"] == "flow": out[-1]["steps"].append(b["text"])
            else: out.append(dict(type="flow", steps=[b["text"]]))
        elif b["type"] == "prompt": out.append(dict(type="prompt", title="Master AI response prompt", text=PROMPT))
        elif b["type"] == "qa":
            q = dict(b); q["kind"] = "scenario" if int(s["number"]) >= 10 else "question"; out.append(q)
        else: out.append(b)
    s["blocks"] = out
# in section 9 the workflow marker must come before the closing note, after the intro
for s in sections:
    if s["number"] == "9":
        w = [b for b in s["blocks"] if b["type"] == "workflow"]; rest = [b for b in s["blocks"] if b["type"] != "workflow"]
        s["blocks"] = rest[:1] + w + rest[1:]
json.dump(sections, open("content/document.json", "w"), ensure_ascii=False, indent=1)
for s in sections: print(s["number"], s["title"][:42], [b["type"] for b in s["blocks"] if b["type"] not in ("p", "li", "h2")])
pdf_words = collections.Counter(re.findall(r"[A-Za-z0-9]+", subprocess.run(["pdftotext", "-f", "3", SRC, "-"], capture_output=True, text=True).stdout))
mine = collections.Counter(re.findall(r"[A-Za-z0-9]+", json.dumps(sections)))
miss = {w: n - mine[w] for w, n in pdf_words.items() if n - mine[w] > 2}
print("missing:", miss)

"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";

function snippet(text, terms) {
  const lower = text.toLowerCase();
  const hit = terms.map((t) => lower.indexOf(t)).filter((i) => i >= 0).sort((a, b) => a - b)[0] ?? 0;
  const start = Math.max(0, hit - 60);
  return (start > 0 ? "…" : "") + text.slice(start, start + 180) + (start + 180 < text.length ? "…" : "");
}
function Marked({ text, terms }) {
  if (!terms.length) return text;
  const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  return text.split(re).map((part, i) => (i % 2 ? <mark key={i} className="rounded bg-gold-300/60 px-0.5 text-inherit dark:bg-gold-500/40">{part}</mark> : part));
}

export default function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(null);
  const input = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      const typing = /input|textarea/i.test(document.activeElement?.tagName || "");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) { e.preventDefault(); setOpen(true); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (!open) return;
    setTimeout(() => input.current?.focus(), 0);
    if (!index) fetch("/search-index.json").then((r) => r.json()).then(setIndex).catch(() => setIndex([]));
  }, [open, index]);

  const terms = useMemo(() => query.toLowerCase().split(/\s+/).filter((t) => t.length > 1), [query]);
  const results = useMemo(() => {
    if (!index || !terms.length) return [];
    return index
      .map((e) => {
        const hay = e.text.toLowerCase(), head = e.heading.toLowerCase();
        if (!terms.every((t) => hay.includes(t) || head.includes(t))) return null;
        const score = terms.reduce((s, t) => s + (head.includes(t) ? 10 : 0) + Math.min(5, hay.split(t).length - 1), 0);
        return { ...e, score };
      })
      .filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 12);
  }, [index, terms]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label="Search the documentation" className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-50 dark:border-white/15 dark:text-slate-300 dark:hover:bg-white/10">
        <SearchIcon size={16} aria-hidden /> <span className="hidden sm:inline">Search</span>
        <kbd className="ml-2 hidden rounded border border-slate-300 px-1 text-xs lg:inline dark:border-white/20">/</kbd>
      </button>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center bg-navy-950/70 p-4 pt-[10vh]" onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div role="dialog" aria-modal="true" aria-label="Search the documentation" className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-navy-900">
            <div className="flex items-center gap-3 border-b border-slate-200 px-4 dark:border-white/10">
              <SearchIcon size={18} aria-hidden className="text-slate-400" />
              <input ref={input} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search lead, workflow, pricing, escalation…" aria-label="Search terms" className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-slate-400" />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close search" className="rounded p-1 hover:bg-slate-100 dark:hover:bg-white/10"><X size={18} aria-hidden /></button>
            </div>
            <ul className="max-h-[60vh] overflow-y-auto p-2" aria-live="polite">
              {!terms.length && <li className="p-4 text-sm text-slate-500">Type at least two letters to search every subsection of the documentation.</li>}
              {terms.length > 0 && index && !results.length && <li className="p-4 text-sm text-slate-500">No subsection contains every word of “{query}”. Try fewer or different words.</li>}
              {results.map((r) => (
                <li key={`${r.slug}#${r.anchor}`}>
                  <Link href={`/docs/${r.slug}${r.anchor ? `#${r.anchor}` : ""}`} onClick={() => setOpen(false)} className="block rounded-lg p-3 hover:bg-slate-100 dark:hover:bg-white/10">
                    <span className="block text-xs text-slate-500">{r.sectionTitle}</span>
                    <span className="block font-semibold text-navy-800 dark:text-white"><Marked text={r.heading} terms={terms} /></span>
                    <span className="block text-sm text-slate-600 dark:text-slate-300"><Marked text={snippet(r.text, terms)} terms={terms} /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

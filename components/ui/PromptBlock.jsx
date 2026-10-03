"use client";
import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

export default function PromptBlock({ title, text }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1800); } catch {}
  };
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-xl border border-slate-700 bg-navy-950 font-sans text-slate-100">
      <figcaption className="flex items-center justify-between gap-3 border-b border-white/10 bg-navy-900 px-4 py-2.5">
        <span className="flex items-center gap-2 text-sm font-semibold"><Terminal size={16} aria-hidden className="text-gold-400" />{title}</span>
        <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 rounded-md border border-white/20 px-3 py-1 text-xs font-semibold hover:bg-white/10" aria-label="Copy the master prompt">
          {done ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}{done ? "Copied" : "Copy prompt"}
        </button>
      </figcaption>
      <pre tabIndex={0} aria-label="Master AI response prompt" className="max-h-[32rem] overflow-auto p-4 font-mono text-[0.8rem] leading-6 whitespace-pre-wrap break-words sm:whitespace-pre-wrap">{text}</pre>
    </figure>
  );
}

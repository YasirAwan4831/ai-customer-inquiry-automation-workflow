"use client";
import { useState } from "react";
import { Link2, Check } from "lucide-react";

export default function CopyLink({ anchor, label }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${anchor}`;
    try { await navigator.clipboard.writeText(url); setDone(true); setTimeout(() => setDone(false), 1800); } catch {}
  };
  return (
    <button type="button" onClick={copy} aria-label={`Copy link to ${label}`} className="ml-2 inline-flex rounded p-1 align-middle text-slate-400 hover:text-gold-600">
      {done ? <Check size={16} aria-hidden /> : <Link2 size={16} aria-hidden />}
      <span className="sr-only" aria-live="polite">{done ? "Link copied" : ""}</span>
    </button>
  );
}

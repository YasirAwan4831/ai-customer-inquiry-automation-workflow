"use client";
import { useEffect, useState } from "react";

export default function TypingLine({ lines }) {
  const [text, setText] = useState(lines[0]);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let l = 0, c = 0, del = false, t;
    const tick = () => {
      const full = lines[l];
      c += del ? -1 : 1;
      setText(full.slice(0, c));
      let wait = del ? 25 : 55;
      if (!del && c === full.length) { del = true; wait = 1400; }
      else if (del && c === 0) { del = false; l = (l + 1) % lines.length; wait = 350; }
      t = setTimeout(tick, wait);
    };
    c = 0; setText(""); t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, [lines]);
  return <p className="mt-4 h-7 font-mono text-base text-gold-300" aria-label={lines.join(". ")}><span aria-hidden className="type-line">{text}</span></p>;
}

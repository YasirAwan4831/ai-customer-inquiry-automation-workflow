import { ArrowRight, ArrowDown } from "lucide-react";

export default function FlowStrip({ steps }) {
  return (
    <ol className="not-prose my-6 flex flex-col items-stretch gap-1 font-sans sm:flex-row sm:flex-wrap sm:items-center" aria-label="Flow">
      {steps.map((s, i) => (
        <li key={i} className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
          <span className="w-full rounded-lg border border-navy-200 bg-navy-50 px-3 py-2 text-center text-sm font-semibold text-navy-800 sm:w-auto dark:border-white/15 dark:bg-white/10 dark:text-white">{s}</span>
          {i < steps.length - 1 && (<><ArrowDown size={16} aria-hidden className="text-gold-600 sm:hidden" /><ArrowRight size={16} aria-hidden className="hidden text-gold-600 sm:block" /></>)}
        </li>
      ))}
    </ol>
  );
}

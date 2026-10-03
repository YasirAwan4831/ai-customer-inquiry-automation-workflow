import { Bot, User, UserRoundCheck } from "lucide-react";

const get = (rows, key) => rows.find(([k]) => k.toLowerCase().startsWith(key))?.[1];

export default function QACard({ rows, kind, index }) {
  const message = get(rows, "customer message");
  const reply = get(rows, "ai response");
  const meta = rows.filter(([k]) => !/^(customer message|ai response)/i.test(k));
  const lead = get(rows, "lead status") || "";
  const tone = /^potential/i.test(lead) ? "border-gold-500 bg-gold-300/15" : "border-slate-300 bg-slate-50 dark:border-white/15 dark:bg-white/5";
  return (
    <div className="not-prose my-6 font-sans">
      <div className="flex gap-3">
        <span aria-hidden className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-white/15"><User size={16} /></span>
        <div className="max-w-[46rem] rounded-2xl rounded-tl-sm border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-navy-900">
          <p className="mb-1 text-xs font-semibold text-slate-500">Customer Message</p>
          <p className="leading-7">{message}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-row-reverse gap-3 sm:ml-10">
        <span aria-hidden className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-800 text-white dark:bg-gold-500 dark:text-navy-950"><Bot size={16} /></span>
        <div className="max-w-[46rem] rounded-2xl rounded-tr-sm bg-navy-800 p-4 text-white dark:bg-navy-700">
          <p className="mb-1 text-xs font-semibold text-gold-300">AI Response</p>
          <p className="text-[0.95rem] leading-7">{reply}</p>
        </div>
      </div>
      <dl className={`mt-4 grid gap-px overflow-hidden rounded-lg border text-sm leading-6 sm:grid-cols-2 ${tone}`}>
        {meta.map(([k, v]) => (
          <div key={k} className="bg-white p-3 dark:bg-navy-950">
            <dt className="text-xs font-semibold text-gold-700 dark:text-gold-300">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

import { AlertTriangle, ArrowDown, CheckCircle2, GitFork, UserCheck } from "lucide-react";
import { mainWorkflow as w } from "@/data/workflows";

const tones = {
  lead: { box: "border-gold-500 bg-gold-300/15", Icon: UserCheck, label: "Lead path" },
  routine: { box: "border-navy-200 bg-navy-50 dark:border-white/15 dark:bg-white/5", Icon: CheckCircle2, label: "Routine path" },
  escalate: { box: "border-red-500/70 bg-red-500/10", Icon: AlertTriangle, label: "Escalation path" },
};
const Arrow = () => <ArrowDown aria-hidden size={18} className="mx-auto my-1 text-gold-600" />;
const Node = ({ n, title, text, highlight }) => (
  <div className={`wf-node rounded-lg border p-3 text-center ${highlight ? "border-gold-500 bg-gold-300/20" : "border-slate-200 bg-white dark:border-white/15 dark:bg-navy-900"}`} style={{ animationDelay: `${(n || 0) * 90}ms` }}>
    <p className="text-sm font-semibold text-navy-800 dark:text-white">{n ? <><span className="sr-only">Step </span>{n}. </> : null}{title}</p>
    {text && <p className="text-xs leading-5 text-slate-600 dark:text-slate-300">{text}</p>}
  </div>
);

export default function WorkflowDiagram({ compact = false }) {
  return (
    <figure className="not-prose my-8 rounded-xl border border-slate-200 bg-slate-50 p-4 font-sans sm:p-6 dark:border-white/10 dark:bg-navy-900/60">
      <figcaption className="mb-4 text-lg font-semibold text-navy-800 dark:text-white">Customer inquiry automation workflow (designed)</figcaption>
      <ol className="mx-auto max-w-md">
        {w.trunk.map(([t, d], i) => (<li key={t}><Node n={i + 1} title={t} text={d} />{<Arrow />}</li>))}
      </ol>
      <div className="mx-auto max-w-md"><div className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gold-500 p-3 text-center"><GitFork size={18} aria-hidden className="shrink-0 text-gold-600" /><div><p className="text-sm font-semibold text-navy-800 dark:text-white">{w.decision[0]}</p><p className="text-xs text-slate-600 dark:text-slate-300">{w.decision[1]}</p></div></div></div>
      <Arrow />
      <div className="grid gap-4 lg:grid-cols-3">
        {w.branches.map((b) => {
          const { box, Icon, label } = tones[b.tone];
          return (
            <section key={b.tag} aria-label={label} className={`rounded-lg border-2 p-3 ${box}`}>
              <p className="mb-2 flex items-center justify-center gap-2 text-center text-sm font-bold text-navy-800 dark:text-white"><Icon size={16} aria-hidden />{b.tag}</p>
              <ol>{b.steps.map((s, i) => (<li key={s}><Node title={s} />{i < b.steps.length - 1 && <Arrow />}</li>))}</ol>
            </section>
          );
        })}
      </div>
      <Arrow />
      <div className="mx-auto max-w-md"><Node title={w.end[0]} text={w.end[1]} highlight /></div>
      {!compact && <p className="mt-4 text-xs leading-5 text-slate-600 dark:text-slate-300">Note: {w.note}</p>}
    </figure>
  );
}

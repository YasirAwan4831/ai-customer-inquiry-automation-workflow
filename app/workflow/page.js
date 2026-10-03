import Breadcrumbs from "@/components/shared/Breadcrumbs";
import WorkflowDiagram from "@/components/workflow/WorkflowDiagram";
import ResponsiveTable from "@/components/research/ResponsiveTable";
import FlowStrip from "@/components/research/FlowStrip";
import { section } from "@/lib/content";

export const metadata = { title: "Workflow", description: "The nine-step automation workflow, the decision logic and the four logical paths of the customer inquiry automation." };

export default function Workflow() {
  const nine = section(8).blocks.find((b) => b.type === "table");
  const paths = section(17).blocks;
  const pathTable = paths.find((b) => b.type === "table");
  const intro = section(8).blocks.filter((b) => b.type === "p").map((b) => b.text);
  const rule = paths.find((b) => b.type === "callout");
  const flows = paths.reduce((a, b, i) => (b.type === "h3" && paths[i + 1]?.type === "flow" ? [...a, [b.text, paths[i + 1].steps]] : a), []);
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Workflow" }]} />
      <h1 className="font-serif text-4xl font-bold text-navy-800 dark:text-white">Automation workflow</h1>
      <p className="mt-3 max-w-[65ch] font-serif text-lg leading-8">{intro[0]}</p>
      <WorkflowDiagram />
      <h2 className="mt-10 font-sans text-2xl font-bold text-navy-800 dark:text-white">The nine-step workflow</h2>
      <ResponsiveTable rows={nine.rows} />
      <h2 className="mt-10 font-sans text-2xl font-bold text-navy-800 dark:text-white">Practical automation logic</h2>
      {flows.map(([t, steps]) => <div key={t}><h3 className="mt-4 font-sans text-lg font-semibold">{t}</h3><FlowStrip steps={steps} /></div>)}
      <ResponsiveTable rows={pathTable.rows} />
      <aside className="rounded-lg border-l-4 border-gold-500 bg-gold-300/15 p-4 text-sm leading-7"><b>{rule.title}.</b> {rule.text}</aside>
    </div>
  );
}

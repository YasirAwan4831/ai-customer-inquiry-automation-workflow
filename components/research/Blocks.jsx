import { Info } from "lucide-react";
import CopyLink from "@/components/ui/CopyLink";
import WorkflowDiagram from "@/components/workflow/WorkflowDiagram";
import PromptBlock from "@/components/ui/PromptBlock";
import QACard from "./QACard";
import FlowStrip from "./FlowStrip";
import ResponsiveTable from "./ResponsiveTable";

function KeyValue({ rows }) {
  return (
    <dl className="not-prose card my-6 divide-y divide-slate-200 overflow-hidden font-sans text-sm leading-6 dark:divide-white/10">
      {rows.map(([k, v]) => (
        <div key={k} className="grid gap-1 p-4 sm:grid-cols-[11rem_1fr] sm:gap-4">
          <dt className="font-semibold text-navy-800 dark:text-gold-300">{k}</dt><dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
function Callout({ block }) {
  return (
    <aside className="not-prose my-8 rounded-lg border-l-4 border-gold-500 bg-gold-300/15 p-5 font-sans dark:bg-gold-500/10">
      <p className="flex items-center gap-2 font-semibold text-navy-800 dark:text-white"><Info size={18} aria-hidden /> {block.title}</p>
      {block.text && <p className="mt-2 text-[0.95rem] leading-7">{block.text}</p>}
      {block.items?.length > 0 && <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.95rem] leading-7 marker:text-gold-600">{block.items.map((t, i) => <li key={i}>{t}</li>)}</ul>}
    </aside>
  );
}

export default function Blocks({ blocks }) {
  const out = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === "li") {
      const items = [];
      while (blocks[i]?.type === "li") items.push(blocks[i++].text);
      i--;
      out.push(<ul key={i}>{items.map((t, j) => <li key={j}>{t}</li>)}</ul>);
    } else if (b.type === "p" && /^\d+\.\s/.test(b.text) && !/^\d+\.\d/.test(b.text)) {
      const items = [];
      while (blocks[i]?.type === "p" && /^\d+\.\s/.test(blocks[i].text)) items.push(blocks[i++].text.replace(/^\d+\.\s/, ""));
      i--;
      out.push(<ol key={i}>{items.map((t, j) => <li key={j}>{t}</li>)}</ol>);
    } else if (b.type === "p") out.push(<p key={i}>{b.text}</p>);
    else if (b.type === "h2") out.push(<h2 key={i} id={b.id}>{b.number} {b.text}<CopyLink anchor={b.id} label={b.text} /></h2>);
    else if (b.type === "h3") out.push(<h3 key={i}>{b.text}</h3>);
    else if (b.type === "table") out.push(<ResponsiveTable key={i} rows={b.rows} />);
    else if (b.type === "numbered") out.push(<ol key={i}>{b.rows.map(([n, t]) => <li key={n}>{t}</li>)}</ol>);
    else if (b.type === "prompt") out.push(<PromptBlock key={i} title={b.title} text={b.text} />);
    else if (b.type === "qa") out.push(<QACard key={i} rows={b.rows} kind={b.kind} />);
    else if (b.type === "flow") out.push(<FlowStrip key={i} steps={b.steps} />);
    else if (b.type === "keyvalue") out.push(<KeyValue key={i} rows={b.rows} />);
    else if (b.type === "callout") out.push(<Callout key={i} block={b} />);
    else if (b.type === "workflow") out.push(<WorkflowDiagram key={i} />);
  }
  return <div className="prose-doc">{out}</div>;
}

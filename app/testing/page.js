import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import QACard from "@/components/research/QACard";
import FlowStrip from "@/components/research/FlowStrip";
import ResponsiveTable from "@/components/research/ResponsiveTable";
import { scenarios, section } from "@/lib/content";

export const metadata = { title: "Testing scenarios", description: "Three testing scenarios: a simple question, a service inquiry and a potential lead." };

export default function Testing() {
  const list = scenarios();
  const s11 = section(11).blocks.find((b) => b.type === "callout");
  const lead = section(12).blocks.find((b) => b.type === "flow");
  const summary = section(13).blocks.find((b) => b.type === "table");
  const obs = section(13).blocks.find((b) => b.type === "callout");
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Testing" }]} />
      <h1 className="font-serif text-4xl font-bold text-navy-800 dark:text-white">Testing scenarios</h1>
      <p className="mt-3 font-serif text-lg leading-8">Simple inquiry, service inquiry, potential lead: three tests of the same master prompt.</p>
      {list.map((s, i) => (
        <section key={s.id} className="mt-10" aria-labelledby={`${s.id}-h`}>
          <p className="text-sm font-semibold text-gold-700 dark:text-gold-300">Scenario {i + 1} of 3</p>
          <h2 id={`${s.id}-h`} className="font-sans text-2xl font-bold text-navy-800 dark:text-white">{s.title.replace(/^Testing Scenario \d+:\s*/, "")}</h2>
          <p className="mt-2 text-sm leading-7">{s.intro}</p>
          <QACard rows={s.rows} kind="scenario" />
          {i === 1 && <aside className="rounded-lg border-l-4 border-gold-500 bg-gold-300/15 p-4 text-sm leading-7"><b>{s11.title}.</b> {s11.text}</aside>}
          {i === 2 && (<><h3 className="mt-4 font-sans text-lg font-semibold">12.1 Lead handling steps</h3><FlowStrip steps={lead.steps} /></>)}
          <Link href={`/docs/${s.id}`} className="mt-2 inline-block text-sm font-semibold underline underline-offset-4">Read in the documentation</Link>
        </section>
      ))}
      <h2 className="mt-12 font-sans text-2xl font-bold text-navy-800 dark:text-white">Testing results summary</h2>
      <ResponsiveTable rows={summary.rows} />
      <aside className="rounded-lg border-l-4 border-gold-500 bg-gold-300/15 p-4 text-sm leading-7"><b>{obs.title}.</b> {obs.text}</aside>
    </div>
  );
}

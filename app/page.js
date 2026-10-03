import Link from "next/link";
import { ArrowRight, Bot, Database, FileText, GitBranch, MessageSquare, ShieldCheck, UserCheck, Layers } from "lucide-react";
import { site } from "@/data/site";
import { section, sections, responses, scenarios } from "@/lib/content";
import TypingLine from "@/components/ui/TypingLine";
import FlowStrip from "@/components/research/FlowStrip";
import WorkflowDiagram from "@/components/workflow/WorkflowDiagram";
import { ZayanLogo } from "@/components/ui/Logo";

const stages = section(4).blocks.find((b) => b.type === "flow").steps;
const stageRows = section(4).blocks.find((b) => b.type === "table").rows.slice(1);
const benefits = section(16).blocks.find((b) => b.type === "table").rows.slice(1);
const oversight = section(15).blocks.find((b) => b.type === "table").rows.slice(1);
const profile = section(1).blocks.find((b) => b.type === "keyvalue").rows;
const scope = section(1).blocks.find((b) => b.type === "callout");

export default function Home() {
  const facts = [
    [FileText, `${sections.length} sections`, "From business introduction to key takeaways"],
    [MessageSquare, `${responses().length} customer questions`, "Each with a tested AI response"],
    [Layers, `${scenarios().length} testing scenarios`, "Simple question, service inquiry, potential lead"],
    [Database, "1 bonus automation", "Lead recording concept (designed, not deployed)"],
    [GitBranch, "4 logical paths", "Routine, service, potential lead, complex"],
    [ShieldCheck, `${oversight.length} escalation cases`, "Where a person takes over"],
  ];
  return (
    <>
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white">
        <div className="mx-auto grid max-w-[90rem] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:py-24">
          <div>
            <p className="hero-rise text-sm font-semibold text-gold-300">{site.shortTitle} · {site.program} · {site.organization}</p>
            <h1 className="hero-rise-2 mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{site.title}</h1>
            <p className="hero-rise-2 mt-4 max-w-[52ch] text-lg text-navy-100">{site.subtitle}</p>
            <div className="hero-rise-3">
              <TypingLine lines={["Receive the customer message", "Understand what the customer wants", "Generate a reply from approved information", "Respond with a clear next step", "Record the inquiry for follow-up"]} />
              <p className="mt-4 max-w-[60ch] leading-7 text-slate-300">A designed workflow for the sample business Star Developer: one reusable master prompt, five tested customer questions, three testing scenarios, a lead-recording concept and clear human escalation.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/docs/1-business-introduction" className="btn btn-primary">Explore Documentation <ArrowRight size={16} aria-hidden /></Link>
                <Link href="/docs/6-master-ai-response-prompt" className="btn btn-ghost">Master Prompt</Link>
                <Link href="/workflow" className="btn btn-ghost">Workflow Diagram</Link>
                <Link href="/testing" className="btn btn-ghost">Testing Scenarios</Link>
              </div>
            </div>
          </div>
          <div className="hero-rise-3 rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur">
            <ZayanLogo height={40} />
            <dl className="mt-4 divide-y divide-white/10 text-sm">
              {site.metadata.map(([k, v]) => <div key={k} className="grid gap-1 py-2 sm:grid-cols-[9rem_1fr]"><dt className="text-gold-300">{k}</dt><dd className="font-medium">{v}</dd></div>)}
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[90rem] px-4 py-14 sm:px-6" aria-labelledby="glance">
        <h2 id="glance" className="font-serif text-3xl font-bold text-navy-800 dark:text-white">Project at a glance</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map(([Icon, big, small]) => <li key={big} className="card flex items-start gap-4 p-5"><Icon className="mt-1 shrink-0 text-gold-600" size={22} aria-hidden /><div><p className="font-semibold text-navy-800 dark:text-white">{big}</p><p className="text-sm text-slate-600 dark:text-slate-300">{small}</p></div></li>)}
        </ul>
        <aside className="mt-6 rounded-lg border-l-4 border-gold-500 bg-gold-300/15 p-5 text-sm leading-7">
          <p className="font-semibold text-navy-800 dark:text-white">{scope.title}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">{scope.items.map((t) => <li key={t}>{t}</li>)}</ul>
        </aside>
      </section>

      <section className="mx-auto max-w-[90rem] px-4 py-6 sm:px-6" aria-labelledby="core">
        <h2 id="core" className="font-serif text-3xl font-bold text-navy-800 dark:text-white">The core workflow</h2>
        <FlowStrip steps={stages} />
        <ul className="mt-2 grid gap-4 md:grid-cols-5">
          {stageRows.map(([stage, meaning, project]) => <li key={stage} className="card p-4 text-sm leading-6"><p className="font-semibold text-navy-800 dark:text-white">{stage}</p><p className="mt-1 text-slate-600 dark:text-slate-300">{meaning}</p><p className="mt-2 border-t border-slate-200 pt-2 dark:border-white/10">{project}</p></li>)}
        </ul>
      </section>

      <section className="mx-auto max-w-[90rem] px-4 py-14 sm:px-6" aria-labelledby="biz">
        <h2 id="biz" className="font-serif text-3xl font-bold text-navy-800 dark:text-white">The sample business: Star Developer</h2>
        <dl className="card mt-6 divide-y divide-slate-200 text-sm leading-6 dark:divide-white/10">
          {profile.map(([k, v]) => <div key={k} className="grid gap-1 p-4 sm:grid-cols-[13rem_1fr] sm:gap-4"><dt className="font-semibold text-navy-800 dark:text-gold-300">{k}</dt><dd>{v}</dd></div>)}
        </dl>
      </section>

      <section className="mx-auto max-w-[90rem] px-4 py-6 sm:px-6" aria-labelledby="diag">
        <h2 id="diag" className="font-serif text-3xl font-bold text-navy-800 dark:text-white">Workflow diagram</h2>
        <WorkflowDiagram compact />
      </section>

      <section className="mx-auto max-w-[90rem] px-4 py-14 sm:px-6" aria-labelledby="ben">
        <h2 id="ben" className="font-serif text-3xl font-bold text-navy-800 dark:text-white">Business benefits</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(([b, how, ex]) => <li key={b} className="card p-5"><p className="flex items-center gap-2 font-semibold text-navy-800 dark:text-white"><UserCheck size={16} aria-hidden className="text-gold-600" />{b}</p><p className="mt-2 text-sm leading-6">{how}</p><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{ex}</p></li>)}
        </ul>
        <p className="mt-4 text-sm">No performance figures are claimed. This is a design exercise, not a measured deployment. <Link href="/docs/16-business-benefits" className="font-semibold underline underline-offset-4">Read the full section</Link></p>
      </section>
    </>
  );
}

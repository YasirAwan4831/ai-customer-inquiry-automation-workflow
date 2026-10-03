import Breadcrumbs from "@/components/shared/Breadcrumbs";
import QACard from "@/components/research/QACard";
import ResponsiveTable from "@/components/research/ResponsiveTable";
import { responses, section } from "@/lib/content";

export const metadata = { title: "AI-generated responses", description: "Five customer questions answered by the master prompt, each with classification, lead status, extracted information and suggested next action." };

export default function Responses() {
  const summary = section(7).blocks.filter((b) => b.type === "table").at(-1);
  const note = section(7).blocks.find((b) => b.type === "callout");
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "AI responses" }]} />
      <h1 className="font-serif text-4xl font-bold text-navy-800 dark:text-white">AI-generated responses</h1>
      <aside className="mt-4 rounded-lg border-l-4 border-gold-500 bg-gold-300/15 p-4 text-sm leading-7"><b>{note.title}.</b> {note.text}</aside>
      {responses().map((r) => (
        <section key={r.id} id={r.id} className="mt-10" aria-labelledby={`${r.id}-h`}>
          <h2 id={`${r.id}-h`} className="font-sans text-2xl font-bold text-navy-800 dark:text-white">{r.number} {r.title}</h2>
          <QACard rows={r.rows} kind="question" />
        </section>
      ))}
      <h2 className="mt-12 font-sans text-2xl font-bold text-navy-800 dark:text-white">Summary of the five responses</h2>
      <ResponsiveTable rows={summary.rows} />
    </div>
  );
}

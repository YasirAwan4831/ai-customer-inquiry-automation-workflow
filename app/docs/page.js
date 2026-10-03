import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { sections, headings } from "@/lib/content";

export const metadata = { title: "Documentation", description: "The complete Practical Task 02 document, section by section: business, prompt, responses, workflow, testing, bonus automation, human oversight, benefits and conclusion." };

export default function ResearchIndex() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Documentation" }]} />
      <h1 className="font-serif text-4xl font-bold text-navy-800 dark:text-white">Documentation</h1>
      <p className="mt-3 max-w-[65ch] font-serif text-lg leading-8">The full document, kept intact and split into {sections.length} sections. Use the sidebar, the search shortcut (press /) or pick a section below.</p>
      <ol className="mt-8 grid gap-4 md:grid-cols-2">
        {sections.map((s) => (
          <li key={s.id}>
            <Link href={`/docs/${s.id}`} className="card block h-full p-5 transition-colors hover:border-gold-500">
              <span className="text-xs font-semibold text-gold-700 dark:text-gold-300">Section {s.number} · page {s.page}</span>
              <span className="mt-1 block text-lg font-semibold text-navy-800 dark:text-white">{s.title}</span>
              {headings(s).length > 0 && <span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">{headings(s).length} subsections</span>}
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}

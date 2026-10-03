import { notFound } from "next/navigation";
import Blocks from "@/components/research/Blocks";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import PrevNext from "@/components/shared/PrevNext";
import TableOfContents from "@/components/navigation/TableOfContents";
import { sections, getSection, neighbours, headings } from "@/lib/content";

export const generateStaticParams = () => sections.map((s) => ({ slug: s.id }));
export function generateMetadata({ params }) {
  const s = getSection(params.slug);
  if (!s) return {};
  const first = s.blocks.find((b) => b.type === "p")?.text.slice(0, 155);
  return { title: s.title, description: first, alternates: { canonical: `/docs/${s.id}` } };
}

export default function SectionPage({ params }) {
  const section = getSection(params.slug);
  if (!section) notFound();
  const { prev, next } = neighbours(section.id);
  const toc = headings(section).map((h) => ({ id: h.id, label: `${h.number} ${h.text}` }));
  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_14rem] xl:gap-10">
      <article>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Documentation", href: "/docs" }, { label: section.title }]} />
        <header>
          {section.number && <p className="text-sm font-semibold text-gold-700 dark:text-gold-300">Section {section.number}</p>}
          <h1 className="mt-1 max-w-[24ch] font-serif text-4xl font-bold leading-tight text-navy-800 sm:text-5xl dark:text-white">{section.title}</h1>
        </header>
        <Blocks blocks={section.blocks} />
        <PrevNext prev={prev} next={next} />
      </article>
      <TableOfContents items={toc} />
    </div>
  );
}

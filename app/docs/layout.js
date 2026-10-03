import ResearchSidebar from "@/components/navigation/ResearchSidebar";
import ReadingProgress from "@/components/navigation/ReadingProgress";
import { sections } from "@/lib/content";

export default function ResearchLayout({ children }) {
  const items = sections.map(({ id, number, title }) => ({ id, number, title }));
  return (
    <div className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10">
      <ReadingProgress />
      <aside><ResearchSidebar items={items} /></aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen } from "lucide-react";

export default function ResearchSidebar({ items }) {
  const path = usePathname();
  const list = (
    <ol className="space-y-0.5 text-sm">
      {items.map((s) => {
        const active = path === `/docs/${s.id}`;
        return (
          <li key={s.id}>
            <Link href={`/docs/${s.id}`} aria-current={active ? "page" : undefined} className={`flex gap-2 rounded-md px-2.5 py-1.5 leading-snug ${active ? "bg-navy-800 font-semibold text-white dark:bg-gold-500 dark:text-navy-950" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"}`}>
              <span className="w-6 shrink-0 text-right tabular-nums opacity-70">{s.number}</span><span>{s.title}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
  return (
    <>
      <details className="mb-6 rounded-lg border border-slate-200 p-3 lg:hidden dark:border-white/10">
        <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold"><BookOpen size={16} aria-hidden /> All sections</summary>
        <nav aria-label="Documentation sections" className="mt-3">{list}</nav>
      </details>
      <nav aria-label="Documentation sections" className="sticky top-20 hidden max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 lg:block">
        <p className="mb-2 px-2.5 text-xs font-semibold text-slate-500">Contents</p>
        {list}
      </nav>
    </>
  );
}

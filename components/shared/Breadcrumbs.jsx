import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={14} aria-hidden />}
            {it.href ? <Link href={it.href} className="hover:text-navy-800 dark:hover:text-white">{it.label}</Link> : <span aria-current="page" className="text-slate-700 dark:text-slate-200">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

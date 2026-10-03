import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { sectionLabel } from "@/lib/content";

export default function PrevNext({ prev, next }) {
  const box = "card block p-4 transition-colors hover:border-gold-500";
  return (
    <nav aria-label="Previous and next section" className="mt-16 grid gap-4 sm:grid-cols-2">
      {prev ? <Link href={`/docs/${prev.id}`} className={box}><span className="flex items-center gap-1 text-xs text-slate-500"><ArrowLeft size={14} aria-hidden /> Previous</span><span className="font-semibold">{sectionLabel(prev)}</span></Link> : <span />}
      {next ? <Link href={`/docs/${next.id}`} className={`${box} sm:text-right`}><span className="flex items-center gap-1 text-xs text-slate-500 sm:justify-end">Next <ArrowRight size={14} aria-hidden /></span><span className="font-semibold">{sectionLabel(next)}</span></Link> : <span />}
    </nav>
  );
}

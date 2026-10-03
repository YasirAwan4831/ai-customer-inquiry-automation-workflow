import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { ZayanLogo } from "@/components/ui/Logo";
import { site, assignment1 } from "@/data/site";
import { section } from "@/lib/content";

export const metadata = { title: "About", description: "Project information and author of Practical Task 02: AI Customer Inquiry Automation Workflow." };

export default function About() {
  const conclusion = section(18).blocks.filter((b) => b.type === "p").map((b) => b.text).join(" ");
  const take = section(19).blocks.find((b) => b.type === "numbered").rows;
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <h1 className="font-serif text-4xl font-bold text-navy-800 dark:text-white">About this project</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <section aria-labelledby="meta" className="card p-6">
          <h2 id="meta" className="text-xl font-semibold text-navy-800 dark:text-white">Project information</h2>
          <dl className="mt-4 divide-y divide-slate-200 text-sm leading-6 dark:divide-white/10">
            {site.metadata.map(([k, v]) => <div key={k} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr]"><dt className="font-semibold text-navy-800 dark:text-gold-300">{k}</dt><dd>{v}</dd></div>)}
          </dl>
          <div className="mt-4"><ZayanLogo height={48} /></div>
          <p className="mt-4 text-sm leading-6">This is a separate project from <a className="font-semibold underline underline-offset-4" href={assignment1} target="_blank" rel="noopener noreferrer">Assignment 01</a>.</p>
        </section>
        <section aria-labelledby="author" className="card overflow-hidden">
          <Image src="/images/profile.jpg" alt="Portrait of Muhammad Yasir" width={1200} height={800} sizes="(min-width: 768px) 480px, 100vw" className="h-auto w-full" />
          <div className="p-6"><h2 id="author" className="text-xl font-semibold text-navy-800 dark:text-white">{site.author}</h2><p className="text-sm text-gold-700 dark:text-gold-300">AI Automation Intern · {site.organization}</p></div>
        </section>
      </div>
      <section className="mt-10" aria-labelledby="concl"><h2 id="concl" className="font-sans text-2xl font-bold text-navy-800 dark:text-white">Conclusion</h2><p className="mt-3 max-w-[70ch] font-serif text-lg leading-8">{conclusion}</p></section>
      <section className="mt-10" aria-labelledby="take"><h2 id="take" className="font-sans text-2xl font-bold text-navy-800 dark:text-white">Key takeaways</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">{take.map(([n, t]) => <li key={n} className="card flex gap-3 p-4 text-sm leading-6"><span className="font-bold text-gold-700 dark:text-gold-300">{n}</span><span>{t}</span></li>)}</ol>
        <Link href="/docs/19-key-takeaways" className="mt-4 inline-block text-sm font-semibold underline underline-offset-4">Read in the documentation</Link></section>
    </div>
  );
}

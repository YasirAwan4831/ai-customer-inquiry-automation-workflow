import Link from "next/link";
import { Github, Linkedin, Twitter, Globe, ArrowUpRight } from "lucide-react";
import { nav, site, socials, assignment1 } from "@/data/site";
import { ZayanLogo } from "@/components/ui/Logo";

const icons = { github: Github, linkedin: Linkedin, twitter: Twitter, globe: Globe };

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-navy-900 text-slate-300">
      {/* Decorative gradient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-[90rem] gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1.1fr]">
        {/* Brand block */}
        <div className="space-y-4">
          <ZayanLogo height={48} />
          <h3 className="text-xl font-bold leading-snug text-white">
            {site.shortTitle}
            <span className="text-gold-400"> · </span>
            {site.title}
          </h3>
          <p className="max-w-sm text-sm leading-relaxed text-slate-400">
            Prepared by <span className="font-semibold text-slate-200">{site.author}</span>
            <br />
            {site.program} · {site.organization}
          </p>
          <p className="border-l-2 border-gold-500/60 pl-3 text-sm italic text-gold-300">
            {site.tagline}
          </p>
        </div>

        {/* Navigation */}
        <nav aria-label="Footer">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold-400">
            Explore
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="group inline-flex items-center gap-1 text-slate-400 transition-colors hover:text-white"
                >
                  <span className="h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-3" />
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Project + Socials */}
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-400">
              Previous Project
            </p>
            <a
              href={assignment1}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:border-gold-400/60 hover:bg-gold-500 hover:text-navy-950"
            >
              Assignment 01: Previous Project
              <ArrowUpRight
                size={15}
                aria-hidden
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <p className="mt-2 text-xs text-slate-500">
              A separate project from this Practical Task 02 site.
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-400">
              Connect
            </p>
            <ul className="flex gap-2.5">
              {socials.map((s) => {
                const Icon = icons[s.icon];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition-all hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-500 hover:text-navy-950"
                    >
                      <Icon size={18} aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[90rem] flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-slate-300">{site.author}</span>. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            Practical Task 02 · {site.organization}
          </p>
        </div>
      </div>
    </footer>
  );
}
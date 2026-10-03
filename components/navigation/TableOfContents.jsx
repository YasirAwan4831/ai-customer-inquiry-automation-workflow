"use client";
import { useEffect, useState, useCallback } from "react";

export default function TableOfContents({ items }) {
  const [active, setActive] = useState(items[0]?.id);
  const [progress, setProgress] = useState(0);

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (!items.length) return;
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean);

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          )[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: [0, 1] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  // Reading progress based on scroll position
  useEffect(() => {
    if (!items.length) return;
    const onScroll = () => {
      const first = document.getElementById(items[0].id);
      const last = document.getElementById(items[items.length - 1].id);
      if (!first || !last) return;

      const start = first.getBoundingClientRect().top + window.scrollY - 100;
      const end =
        last.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;

      const total = Math.max(end - start, 1);
      const current = Math.min(
        Math.max(window.scrollY - start, 0),
        total
      );
      setProgress((current / total) * 100);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  // Smooth scroll handler
  const handleClick = useCallback((e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: "smooth" });
    // Update URL hash without jumping
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  }, []);

  if (items.length < 2) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-20 hidden max-h-[calc(100vh-6rem)] overflow-y-auto pr-1 text-sm xl:block"
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          <span className="h-1 w-1 rounded-full bg-gold-500" />
          On this page
        </p>
        <span className="text-[10px] font-medium tabular-nums text-slate-400 dark:text-slate-500">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-4 h-0.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-600 transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ul className="relative space-y-1 border-l border-slate-200 dark:border-white/10">
        {items.map((i) => {
          const isActive = active === i.id;
          const depth = i.depth ?? 0; // support nested headings if provided
          return (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                onClick={(e) => handleClick(e, i.id)}
                aria-current={isActive ? "location" : undefined}
                style={{ paddingLeft: `${12 + depth * 14}px` }}
                className={`group -ml-px flex items-center border-l-2 py-1.5 pr-2 leading-snug transition-all duration-200 ${
                  isActive
                    ? "border-gold-500 font-semibold text-navy-800 dark:text-gold-300"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-navy-800 dark:hover:border-white/25 dark:hover:text-white"
                }`}
              >
                <span
                  className={`mr-2 h-1 w-1 shrink-0 rounded-full transition-all duration-200 ${
                    isActive
                      ? "scale-100 bg-gold-500"
                      : "scale-0 bg-slate-400 group-hover:scale-100"
                  }`}
                  aria-hidden
                />
                <span className="truncate">{i.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
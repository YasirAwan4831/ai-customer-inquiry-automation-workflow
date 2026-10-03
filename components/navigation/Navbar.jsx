"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/data/site";
import { MyLogo } from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Search from "./Search";

const special = nav.map((n) => n.href).filter((h) => h.startsWith("/docs/"));

const isActive = (path, href) => {
  if (href === "/") return path === "/";
  if (href === "/docs")
    return path.startsWith("/docs") && !special.includes(path);
  return path === href || path.startsWith(href + "/");
};

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [path]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const cls = (href) =>
    isActive(path, href)
      ? "bg-navy-50 font-semibold text-navy-800 dark:bg-white/10 dark:text-gold-300"
      : "text-slate-600 hover:bg-slate-100 hover:text-navy-800 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70 dark:border-white/10 dark:bg-navy-950/80 dark:supports-[backdrop-filter]:bg-navy-950/70">
      {/* Gradient accent line */}
      <div
        aria-hidden
        className="h-0.5 w-full bg-gradient-to-r from-transparent via-gold-500/60 to-transparent"
      />

      <div className="mx-auto flex h-16 max-w-[90rem] items-center gap-3 px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-md font-semibold text-navy-800 transition-opacity hover:opacity-90 dark:text-white"
          onClick={() => setOpen(false)}
        >
          <span className="transition-transform duration-300 group-hover:scale-105">
            <MyLogo size={32} />
          </span>
          <span className="hidden text-sm sm:inline">{site.shortTitle}</span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Main"
          className="ml-4 hidden flex-1 items-center gap-1 lg:flex"
        >
          {nav.map((n) => {
            const active = isActive(path, n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors ${cls(n.href)}`}
              >
                {n.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold-500 transition-all duration-300 ${
                    active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <Search />
          <ThemeToggle />
          <button
            type="button"
            className="rounded-md p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-navy-800 lg:hidden dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <span className="relative block h-5 w-5">
              <Menu
                size={20}
                aria-hidden
                className={`absolute inset-0 transition-all duration-300 ${
                  open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                }`}
              />
              <X
                size={20}
                aria-hidden
                className={`absolute inset-0 transition-all duration-300 ${
                  open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-slate-200 bg-white transition-[max-height,opacity] duration-300 ease-in-out lg:hidden dark:border-white/10 dark:bg-navy-950 ${
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="px-4 py-3 sm:px-6">
          <ul className="grid gap-1">
            {nav.map((n) => {
              const active = isActive(path, n.href);
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm transition-colors ${cls(n.href)}`}
                  >
                    <span>{n.label}</span>
                    {active && (
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full bg-gold-500"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
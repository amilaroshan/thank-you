"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { href: "/", label: "Community messages" },
  { href: "/where-we-are", label: "Where we are" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/charities", label: "Charities" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActivePath(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 bg-white border-b"
      style={{ borderColor: "#dfdede" }}
    >
      <div className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-[120px]">
        {/* Logo */}
        <Link
          href="/"
          aria-label="ShareGratitude home"
          className="shrink-0 focus-visible:outline-2 focus-visible:outline-teal focus-visible:rounded-sm"
        >
          <Image
            src="/images/logo.svg"
            alt="ShareGratitude"
            width={103}
            height={40}
            priority
            className="h-[40px] w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map(({ href, label }) => {
              const active = isActivePath(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className="text-[15px] text-navy hover:text-teal transition-colors focus-visible:outline-2 focus-visible:outline-teal focus-visible:rounded-sm"
                    style={{
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA + mobile trigger */}
        <div className="flex items-center gap-3">
          <Link
            href="https://web.humansofsharegratitude.com/?category=global"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center justify-center rounded-[6px] px-[10px] h-[40px] text-[14px] font-semibold text-navy transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-teal"
            style={{ backgroundColor: "#00CCCC" }}
          >
            How can I say Thank You?
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

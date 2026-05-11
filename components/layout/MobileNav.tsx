"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Community messages" },
  { href: "/where-we-are", label: "Where we are" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/charities", label: "Charities" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation menu"
            className="lg:hidden"
          />
        }
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <nav aria-label="Mobile navigation" className="p-4">
          <ul className="mt-4 flex flex-col gap-1">
            {navLinks.map(({ href, label }, i) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-base text-navy transition-colors hover:text-teal"
                  style={{ fontWeight: i === 0 ? 600 : 400 }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link
              href="/say-thank-you"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center rounded-[6px] px-4 py-2.5 text-sm font-semibold text-navy transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#00CCCC" }}
            >
              Say Thank You
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

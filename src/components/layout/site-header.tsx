"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Minus, Phone } from "lucide-react";
import { useState } from "react";
import { Brand } from "@/components/layout/brand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/booking", label: "الحجز" },
  { href: "/services", label: "الخدمات" },
  { href: "/support", label: "الدعم الفني" },
  { href: "/contact", label: "تواصل معنا" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="container-page flex h-18 items-center justify-between gap-4">
        <Brand />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="التنقل">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                pathname === link.href && "bg-teal-50 text-teal-800",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="secondary">
            <a href="tel:01028892832">
              <Phone aria-hidden="true" />
              0102 889 2832
            </a>
          </Button>
          <Button asChild>
            <Link href="/booking">احجز الآن</Link>
          </Button>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
        >
          {open ? <Minus aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="container-page grid gap-2 py-4" aria-label="قائمة الجوال">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-3 text-sm font-bold text-slate-700",
                  pathname === link.href && "bg-teal-50 text-teal-800",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

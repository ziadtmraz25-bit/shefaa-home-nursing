import Link from "next/link";
import { Brand } from "@/components/layout/brand";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-page grid gap-6 py-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Brand />
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
            خدمات تمريض منزلي في مصر بتصميم عربي واضح وتجربة حجز سهلة وآمنة.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-950">روابط سريعة</h2>
          <div className="mt-3 grid gap-2 text-sm text-slate-600">
            <Link href="/services">الخدمات</Link>
            <Link href="/booking">الحجز</Link>
            <Link href="/support">الدعم الفني</Link>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-950">تواصل معنا</h2>
          <div className="mt-3 grid gap-2 text-sm text-slate-600">
            <a href="tel:01028892832">0102 889 2832</a>
            <span>فاقوس، الشرقية</span>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 py-4 text-center text-sm font-semibold text-slate-500">
        تحت إدارة زياد اسماعيل
      </div>
    </footer>
  );
}

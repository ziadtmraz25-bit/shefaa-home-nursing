import Link from "next/link";
import { Stethoscope } from "lucide-react";

export function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="flex size-11 items-center justify-center rounded-lg bg-teal-700 text-white">
        <Stethoscope className="size-5" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="block text-lg font-black text-slate-950">شفاء</span>
        <span className="block text-xs font-semibold text-slate-500">
          للتمريض المنزلي
        </span>
      </span>
    </Link>
  );
}

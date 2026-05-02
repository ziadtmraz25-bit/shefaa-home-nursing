"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="grid gap-3">
      {items.map((item, index) => (
        <div key={item.question} className="rounded-lg border border-slate-200 bg-white">
          <button
            type="button"
            className="flex w-full items-center justify-between gap-4 p-5 text-right font-bold text-slate-950"
            onClick={() => setOpen(open === index ? -1 : index)}
          >
            {item.question}
            <ChevronDown
              className={cn(
                "size-5 shrink-0 text-teal-700 transition-transform",
                open === index && "rotate-180",
              )}
              aria-hidden="true"
            />
          </button>
          <div
            className={cn(
              "grid transition-all duration-300",
              open === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
          >
            <div className="overflow-hidden">
              <p className="px-5 pb-5 text-sm leading-7 text-slate-600">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

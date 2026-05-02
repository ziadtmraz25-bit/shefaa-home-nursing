"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Testimonial = {
  name: string;
  area: string;
  quote: string;
};

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [items.length]);

  const current = items[active];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <p className="min-h-24 text-lg font-semibold leading-9 text-slate-900">
        “{current.quote}”
      </p>
      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <p className="font-bold text-slate-950">{current.name}</p>
          <p className="text-sm text-slate-500">{current.area}</p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="السابق"
            onClick={() => setActive((active - 1 + items.length) % items.length)}
          >
            <ChevronRight aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="التالي"
            onClick={() => setActive((active + 1) % items.length)}
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}

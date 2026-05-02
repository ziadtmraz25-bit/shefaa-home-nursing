"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  bookingSchema,
  type BookingFormInput,
  type BookingInput,
} from "@/lib/validations/booking";

type ServiceOption = {
  id: string;
  title: string;
};

export function BookingForm() {
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormInput, unknown, BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      city: "",
      serviceId: "",
      patientCondition: "",
      preferredDate: "",
      preferredTime: "",
      notes: "",
    },
  });

  useEffect(() => {
    fetch("/api/services")
      .then((response) => response.json())
      .then((data) => setServices(data.services ?? []))
      .catch(() => setServices([]));
  }, []);

  async function onSubmit(values: BookingInput) {
    setMessage(null);

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage({ type: "error", text: data.message ?? "تعذر إرسال الطلب." });
      return;
    }

    setMessage({
      type: "success",
      text: data.message ?? "تم إرسال طلبك بنجاح، سيتواصل معك فريق شفا قريبًا.",
    });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-8">
      {message ? (
        <div className={message.type === "success" ? "rounded-md bg-teal-50 p-4 text-sm font-semibold text-teal-800" : "rounded-md bg-red-50 p-4 text-sm font-semibold text-red-700"}>
          {message.text}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="الاسم بالكامل" error={errors.fullName?.message}>
          <input className="input-field" {...register("fullName")} />
        </Field>

        <Field label="رقم الهاتف" error={errors.phone?.message}>
          <input className="input-field" {...register("phone")} dir="ltr" />
        </Field>

        <Field label="العنوان" error={errors.address?.message}>
          <input className="input-field" {...register("address")} />
        </Field>

        <Field label="المدينة" error={errors.city?.message}>
          <input className="input-field" {...register("city")} />
        </Field>

        <Field label="الخدمة" error={errors.serviceId?.message}>
          <select className="input-field" {...register("serviceId")}>
            <option value="">اختيار الخدمة لاحقا</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
        </Field>

        <Field label="عمر المريض" error={errors.patientAge?.message}>
          <input className="input-field" type="number" min="0" max="130" {...register("patientAge")} />
        </Field>

        <Field label="التاريخ المفضل" error={errors.preferredDate?.message}>
          <input className="input-field" type="date" {...register("preferredDate")} />
        </Field>

        <Field label="الوقت المفضل" error={errors.preferredTime?.message}>
          <input className="input-field" type="time" {...register("preferredTime")} />
        </Field>
      </div>

      <Field label="حالة المريض" error={errors.patientCondition?.message}>
        <textarea className="input-field min-h-28" {...register("patientCondition")} />
      </Field>

      <Field label="ملاحظات إضافية" error={errors.notes?.message}>
        <textarea className="input-field min-h-24" {...register("notes")} />
      </Field>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-fit">
        {isSubmitting ? <Loader2 className="animate-spin" aria-hidden="true" /> : null}
        إرسال طلب الحجز
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-800">
      {label}
      {children}
      {error ? <span className="text-xs font-semibold text-red-600">{error}</span> : null}
    </label>
  );
}

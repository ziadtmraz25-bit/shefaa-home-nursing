"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  contactMessageSchema,
  type ContactMessageInput,
} from "@/lib/validations";

export function ContactForm() {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactMessageInput>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactMessageInput) {
    setMessage(null);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await response.json();

    if (!response.ok) {
      setMessage({ type: "error", text: data.message ?? "حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى." });
      return;
    }

    setMessage({ type: "success", text: data.message });
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
          <input className="input-field" dir="ltr" {...register("phone")} />
        </Field>
        <Field label="البريد الإلكتروني" error={errors.email?.message}>
          <input className="input-field" type="email" dir="ltr" {...register("email")} />
        </Field>
      </div>

      <Field label="رسالتك" error={errors.message?.message}>
        <textarea className="input-field min-h-36" {...register("message")} />
      </Field>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-fit">
        {isSubmitting ? <Loader2 className="animate-spin" aria-hidden="true" /> : null}
        إرسال الرسالة
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

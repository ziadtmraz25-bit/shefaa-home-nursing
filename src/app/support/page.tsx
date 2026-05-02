import { SupportForm } from "@/components/support/SupportForm";

export const metadata = {
  title: "الدعم الفني",
};

export default function SupportPage() {
  return (
    <section className="bg-slate-50 py-14 md:py-20">
      <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-bold text-teal-700">مساعدة ودعم</p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950 md:text-5xl">
            الدعم الفني
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-600">
            إذا كان لديك استفسار أو مشكلة في الحجز، أرسل لنا التفاصيل وسيقوم
            فريق شفا بالتواصل معك.
          </p>
        </div>
        <SupportForm />
      </div>
    </section>
  );
}

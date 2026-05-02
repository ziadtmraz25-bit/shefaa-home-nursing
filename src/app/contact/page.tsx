import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = {
  title: "تواصل معنا",
};

const contactCards = [
  { label: "رقم الهاتف", value: "0102 889 2832", icon: Phone },
  { label: "واتساب", value: "0102 889 2832", icon: MessageCircle },
  { label: "ساعات العمل", value: "يوميًا من 9 صباحًا حتى 10 مساءً", icon: Clock },
  {
    label: "المنطقة",
    value: "خدمات تمريض منزلي داخل المدينة والمناطق القريبة",
    icon: MapPin,
  },
];

export default function ContactPage() {
  return (
    <section className="bg-slate-50 py-14 md:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold text-teal-700">فريق شفا</p>
          <h1 className="mt-3 text-3xl font-black text-slate-950 md:text-5xl">
            تواصل معنا
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
            فريق شفا جاهز للرد على استفساراتك ومساعدتك في اختيار الخدمة المناسبة.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card) => (
            <article key={card.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <card.icon className="size-5" aria-hidden="true" />
              </div>
              <h2 className="font-black text-slate-950">{card.label}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{card.value}</p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

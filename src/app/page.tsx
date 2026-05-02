import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  HeartPulse,
  Home,
  MessageCircle,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { AnimatedCounter } from "@/components/home/AnimatedCounter";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "رعاية كبار السن",
    description: "متابعة العلامات الحيوية وتنظيم الأدوية ودعم الحركة داخل المنزل.",
    icon: HeartPulse,
  },
  {
    title: "رعاية ما بعد العمليات",
    description: "زيارات تمريضية هادئة لمتابعة التعافي وتعليمات الطبيب.",
    icon: ShieldCheck,
  },
  {
    title: "حقن ومحاليل منزلية",
    description: "تنفيذ الحقن والمحاليل حسب وصف الطبيب مع إجراءات تعقيم واضحة.",
    icon: Stethoscope,
  },
];

const stats = [
  { label: "حالة تم متابعتها", value: 1200, suffix: "+" },
  { label: "متوسط سرعة الاستجابة", value: 30, suffix: " دقيقة" },
  { label: "مناطق مغطاة", value: 35, suffix: "+" },
  { label: "دعم ومتابعة", value: 24, suffix: "/7" },
];

const faqs = [
  {
    question: "هل يمكن الحجز في نفس اليوم؟",
    answer: "نعم، حسب توافر الفريق والمنطقة. بعد إرسال الطلب نتواصل معك لتأكيد أقرب موعد مناسب.",
  },
  {
    question: "هل الخدمة بديل عن الطبيب؟",
    answer: "الخدمة تمريضية وليست تشخيصا طبيا. نلتزم بتعليمات الطبيب وننبه الأسرة عند الحاجة لمراجعة طبية.",
  },
  {
    question: "هل يمكن اختيار ممرض أو ممرضة؟",
    answer: "يمكن توضيح التفضيل في الملاحظات، ونحاول توفيره حسب التوافر ونوع الخدمة والمنطقة.",
  },
];

const testimonials = [
  {
    name: "أ. منى",
    area: "المعادي",
    quote: "التواصل كان واضحا والممرضة وصلت في الموعد وتعاملت مع والدتي باحترام وهدوء.",
  },
  {
    name: "م. خالد",
    area: "الشيخ زايد",
    quote: "احتجنا متابعة بعد عملية، وكانت الزيارة منظمة والتقرير طمنا على الحالة.",
  },
  {
    name: "د. سارة",
    area: "مدينة نصر",
    quote: "تجربة مريحة للأسر التي تحتاج رعاية منزلية محترفة بدون تعقيد.",
  },
];

const reasons = [
  { label: "استجابة سريعة", icon: Clock },
  { label: "زيارة منزلية مريحة", icon: Home },
  { label: "متابعة ودعم مستمر", icon: MessageCircle },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <Image
          src="/images/home-nursing-hero.png"
          alt="ممرض يقدم رعاية منزلية لمريض في المنزل"
          fill
          priority
          className="object-cover opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-slate-950 via-slate-950/80 to-teal-950/30" />
        <div className="container-page relative grid min-h-[760px] items-center py-20">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-md bg-teal-400/15 px-4 py-2 text-sm font-bold text-teal-100 ring-1 ring-teal-200/30">
              شفاء للتمريض المنزلي
            </p>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              تمريض منزلي موثوق في خدمتك على مدار الساعة
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-100">
              نقدم رعاية تمريضية منزلية باحترافية، مع سهولة الحجز وسرعة الاستجابة
              والدعم المستمر.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="default" className="shadow-lg shadow-teal-950/30">
                <Link href="/booking">
                  <CalendarDays aria-hidden="true" />
                  احجز زيارة الآن
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white hover:text-slate-950">
                <Link href="/contact">
                  <MessageCircle aria-hidden="true" />
                  تواصل معنا
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section className="bg-white py-16">
          <div className="container-page grid gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
                <p className="text-3xl font-black text-teal-700">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="bg-slate-50 py-20">
          <div className="container-page">
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-bold text-teal-700">خدماتنا</p>
              <h2 className="mt-3 text-3xl font-black text-slate-950">رعاية منزلية منظمة وواضحة</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl"
                >
                  <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-blue-50 text-blue-800 group-hover:bg-teal-700 group-hover:text-white">
                    <service.icon className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-black text-slate-950">{service.title}</h3>
                  <p className="mt-3 leading-8 text-slate-600">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="bg-white py-20">
          <div className="container-page grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold text-teal-700">لماذا شفاء؟</p>
              <h2 className="mt-3 text-3xl font-black text-slate-950">تجربة حجز أسهل ورعاية أكثر وضوحا</h2>
              <div className="mt-8 grid gap-4">
                {reasons.map((reason) => (
                  <div key={reason.label} className="flex items-center gap-3 rounded-lg bg-slate-50 p-4">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                      <reason.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-bold text-slate-800">{reason.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <TestimonialCarousel items={testimonials} />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="bg-slate-50 py-20">
          <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold text-teal-700">الأسئلة الشائعة</p>
              <h2 className="mt-3 text-3xl font-black text-slate-950">إجابات سريعة قبل الحجز</h2>
            </div>
            <FaqAccordion items={faqs} />
          </div>
        </section>
      </ScrollReveal>

      <a
        href="https://wa.me/201028892832"
        className="fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full bg-teal-700 px-5 py-3 text-sm font-bold text-white shadow-xl hover:-translate-y-1 hover:bg-teal-800"
      >
        <MessageCircle className="size-5" aria-hidden="true" />
        واتساب
      </a>
    </>
  );
}

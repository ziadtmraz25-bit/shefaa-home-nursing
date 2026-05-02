import Link from "next/link";
import {
  Activity,
  Baby,
  Bandage,
  HeartPulse,
  Home,
  ShieldCheck,
  Syringe,
  UserRoundCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "خدمات التمريض المنزلي",
};

const fallbackServices = [
  {
    title: "تمريض منزلي لكبار السن",
    description:
      "رعاية يومية لكبار السن داخل المنزل، تشمل متابعة الحالة العامة والمساعدة في الأنشطة اليومية.",
    icon: UserRoundCheck,
  },
  {
    title: "رعاية ما بعد العمليات",
    description:
      "متابعة الجروح، الغيارات، الالتزام بتعليمات الطبيب، ومراقبة الحالة بعد العمليات الجراحية.",
    icon: ShieldCheck,
  },
  {
    title: "إعطاء الحقن والمحاليل",
    description:
      "خدمة إعطاء الحقن وتركيب المحاليل في المنزل بواسطة طاقم تمريضي مؤهل.",
    icon: Syringe,
  },
  {
    title: "قياس الضغط والسكر",
    description:
      "زيارات منزلية لقياس الضغط والسكر ومتابعة العلامات الحيوية الأساسية.",
    icon: Activity,
  },
  {
    title: "غيارات الجروح",
    description:
      "تغيير الضمادات والعناية بالجروح والحروق والقرح باستخدام أدوات معقمة.",
    icon: Bandage,
  },
  {
    title: "رعاية مرضى الجلطات",
    description:
      "مساعدة المرضى بعد الجلطات في الرعاية اليومية والمتابعة حسب تعليمات الطبيب.",
    icon: HeartPulse,
  },
  {
    title: "رعاية الأطفال",
    description:
      "رعاية تمريضية منزلية للأطفال للحالات المناسبة مع المتابعة والاهتمام.",
    icon: Baby,
  },
  {
    title: "علاج طبيعي منزلي",
    description:
      "إمكانية طلب جلسات علاج طبيعي منزلية حسب الحالة واحتياج المريض.",
    icon: Home,
  },
];

async function getServices() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
      select: {
        title: true,
        shortDescription: true,
        description: true,
      },
    });

    if (services.length === 0) return fallbackServices;

    return services.map((service, index) => ({
      title: service.title,
      description: service.shortDescription || service.description,
      icon: fallbackServices[index % fallbackServices.length].icon,
    }));
  } catch {
    return fallbackServices;
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <section className="bg-slate-50 py-14 md:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold text-teal-700">خدمات شفا</p>
          <h1 className="mt-3 text-3xl font-black text-slate-950 md:text-5xl">
            خدمات التمريض المنزلي
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
            نوفر مجموعة متكاملة من خدمات الرعاية والتمريض المنزلي لتناسب
            احتياجات المرضى وكبار السن.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl"
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-blue-50 text-blue-800 group-hover:bg-teal-700 group-hover:text-white">
                <service.icon className="size-6" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-black text-slate-950">{service.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/booking">احجز زيارة الآن</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">اسأل عن الخدمة</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

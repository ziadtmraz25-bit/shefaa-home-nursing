import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? "file:./dev.db",
  }),
});

const services = [
  {
    title: "رعاية كبار السن",
    slug: "elderly-care",
    shortDescription: "متابعة يومية آمنة لكبار السن في المنزل.",
    description:
      "خدمة تمريض منزلي تشمل متابعة العلامات الحيوية، المساعدة في الحركة، وتنظيم الأدوية حسب تعليمات الطبيب.",
    priceFrom: 450,
  },
  {
    title: "رعاية ما بعد العمليات",
    slug: "post-operative-care",
    shortDescription: "متابعة مهنية خلال فترة التعافي.",
    description:
      "زيارات تمريضية للعناية بالحالة بعد الخروج من المستشفى، ومتابعة الجروح والتعليمات الطبية.",
    priceFrom: 550,
  },
  {
    title: "حقن ومحاليل منزلية",
    slug: "home-injections",
    shortDescription: "تنفيذ الحقن والمحاليل في المنزل.",
    description:
      "ممرضون مؤهلون لإعطاء الحقن وتركيب المحاليل حسب وصف الطبيب مع الالتزام بإجراءات التعقيم.",
    priceFrom: 250,
  },
];

const faqs = [
  {
    question: "هل الخدمة متاحة في القاهرة والجيزة؟",
    answer:
      "نعم، نخدم أغلب مناطق القاهرة والجيزة، ويتم تأكيد التوفر عند مراجعة طلب الحجز.",
  },
  {
    question: "كيف يتم تحديد سعر الخدمة؟",
    answer:
      "السعر يعتمد على نوع الخدمة، مدة الزيارة، المنطقة، واحتياج الحالة. يتم التأكيد قبل الزيارة.",
  },
  {
    question: "هل الخدمة بديل عن الطبيب؟",
    answer:
      "لا، الخدمة تمريضية وليست تشخيصا طبيا. نلتزم بتعليمات الطبيب وننبه الأسرة عند الحاجة لمراجعة طبية.",
  },
];

async function main() {
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  for (const faq of faqs) {
    const existing = await prisma.fAQ.findFirst({
      where: { question: faq.question },
    });

    if (existing) {
      await prisma.fAQ.update({
        where: { id: existing.id },
        data: faq,
      });
    } else {
      await prisma.fAQ.create({ data: faq });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

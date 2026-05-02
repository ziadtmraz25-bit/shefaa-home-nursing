import { BookingForm } from "@/components/booking/BookingForm";

export const metadata = {
  title: "حجز زيارة تمريض منزلي",
};

export default function BookingPage() {
  return (
    <section className="bg-slate-50 py-14 md:py-20">
      <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-bold text-teal-700">طلب حجز</p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950 md:text-5xl">
            احجز زيارة تمريض منزلي بسهولة
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-600">
            املأ البيانات وسيتواصل معك فريق شفا لتأكيد التفاصيل والموعد المناسب.
          </p>
        </div>
        <BookingForm />
      </div>
    </section>
  );
}

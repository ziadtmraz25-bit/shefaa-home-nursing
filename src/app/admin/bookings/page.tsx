import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "إدارة الحجوزات",
};

const statusLabels = {
  NEW: "جديد",
  REVIEWING: "قيد المراجعة",
  CONTACTED: "تم التواصل",
  COMPLETED: "مكتمل",
  CANCELLED: "ملغي",
};

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      service: {
        select: { title: true },
      },
    },
  });

  return (
    <section className="bg-slate-50 py-10">
      <div className="container-page">
        <div className="mb-6">
          <p className="text-sm font-bold text-teal-700">لوحة الإدارة</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">طلبات الحجز</h1>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-600">
            لا توجد طلبات حجز حتى الآن.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[1000px] text-right text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="p-4">العميل</th>
                  <th className="p-4">الهاتف</th>
                  <th className="p-4">المدينة</th>
                  <th className="p-4">الخدمة</th>
                  <th className="p-4">الموعد</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4">حالة المريض</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-t border-slate-100 align-top">
                    <td className="p-4 font-bold text-slate-950">{booking.fullName}</td>
                    <td className="p-4 text-slate-700" dir="ltr">
                      {booking.phone}
                    </td>
                    <td className="p-4 text-slate-700">{booking.city}</td>
                    <td className="p-4 text-slate-700">
                      {booking.service?.title ?? "اختيار لاحقًا"}
                    </td>
                    <td className="p-4 text-slate-700">
                      {new Intl.DateTimeFormat("ar-EG", {
                        dateStyle: "medium",
                        timeZone: "UTC",
                      }).format(booking.preferredDate)}
                      <span className="mx-2">-</span>
                      <span dir="ltr">{booking.preferredTime}</span>
                    </td>
                    <td className="p-4">
                      <span className="rounded-md bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-800">
                        {statusLabels[booking.status]}
                      </span>
                    </td>
                    <td className="max-w-xs p-4 leading-7 text-slate-700">
                      {booking.patientCondition}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

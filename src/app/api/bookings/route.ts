import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { bookingSchema } from "@/lib/validations/booking";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "برجاء مراجعة بيانات الحجز." },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const preferredDate = new Date(`${data.preferredDate}T00:00:00.000Z`);
    const requestedServiceId =
      !data.serviceId || data.serviceId === "اختيار الخدمة لاحقًا"
        ? null
        : data.serviceId;
    const service = requestedServiceId
      ? await prisma.service.findUnique({
          where: { id: requestedServiceId },
          select: { id: true },
        })
      : null;

    if (Number.isNaN(preferredDate.getTime())) {
      return NextResponse.json(
        { message: "برجاء اختيار تاريخ صحيح." },
        { status: 400 },
      );
    }

    await prisma.booking.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        address: data.address,
        city: data.city,
        serviceId: service?.id ?? null,
        patientAge: data.patientAge,
        patientCondition: data.patientCondition,
        preferredDate,
        preferredTime: data.preferredTime,
        notes: data.notes || null,
      },
    });

    return NextResponse.json({
      message: "تم إرسال طلبك بنجاح، سيتواصل معك فريق شفا قريبًا.",
    });
  } catch (error) {
    console.error("Booking submission failed:", error);
    return NextResponse.json(
      { message: "حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى." },
      { status: 500 },
    );
  }
}

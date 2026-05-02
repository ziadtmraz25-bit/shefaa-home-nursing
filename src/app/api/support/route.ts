import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supportTicketSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = supportTicketSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "برجاء مراجعة بيانات طلب الدعم." },
        { status: 400 },
      );
    }

    const data = parsed.data;

    await prisma.supportTicket.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email || null,
        subject: data.subject,
        message: data.message,
      },
    });

    return NextResponse.json({
      message: "تم إرسال طلب الدعم بنجاح، سيتواصل معك فريق شفا قريبًا.",
    });
  } catch (error) {
    console.error("Support ticket submission failed:", error);
    return NextResponse.json(
      { message: "حدث خطأ أثناء إرسال طلب الدعم. حاول مرة أخرى." },
      { status: 500 },
    );
  }
}

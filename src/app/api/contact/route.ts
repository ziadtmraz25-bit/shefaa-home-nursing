import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactMessageSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactMessageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "برجاء مراجعة بيانات الرسالة." },
        { status: 400 },
      );
    }

    const data = parsed.data;

    await prisma.contactMessage.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email || null,
        message: data.message,
      },
    });

    return NextResponse.json({
      message: "تم إرسال رسالتك بنجاح، سنقوم بالتواصل معك قريبًا.",
    });
  } catch (error) {
    console.error("Contact message submission failed:", error);
    return NextResponse.json(
      { message: "حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى." },
      { status: 500 },
    );
  }
}

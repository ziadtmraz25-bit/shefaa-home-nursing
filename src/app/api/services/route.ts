import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
      select: { id: true, title: true },
    });

    return NextResponse.json({ services });
  } catch {
    return NextResponse.json({ services: [] });
  }
}

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

/**
 * Create Admin User
 * WARNING: This endpoint should be secured or removed in production
 * Use it once to create the initial admin user, then remove or protect it
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing required fields: email, password, name" },
        { status: 400 }
      );
    }

    const existing = await prisma.admin.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Admin user already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return NextResponse.json(admin, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/create error:", error);
    return NextResponse.json(
      { error: "Failed to create admin user" },
      { status: 500 }
    );
  }
}

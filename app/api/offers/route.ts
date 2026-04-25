import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const skip = parseInt(searchParams.get("skip") || "0");
    const take = parseInt(searchParams.get("take") || "10");

    const [offers, total] = await Promise.all([
      prisma.offer.findMany({
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.offer.count(),
    ]);

    return NextResponse.json(
      { offers, total, skip, take },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/offers error:", error);
    return NextResponse.json(
      { error: "Failed to fetch offers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const unauthorized = await requireAuth();
    if (unauthorized) return unauthorized;

    const body = await request.json();

    const { title, description, link, ctaLabel } = body;

    if (!title || !description || !link) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, link" },
        { status: 400 }
      );
    }

    const offer = await prisma.offer.create({
      data: {
        title,
        description,
        link,
        ctaLabel: ctaLabel || "View all offers",
      },
    });

    return NextResponse.json(offer, { status: 201 });
  } catch (error) {
    console.error("POST /api/offers error:", error);
    return NextResponse.json(
      { error: "Failed to create offer" },
      { status: 500 }
    );
  }
}

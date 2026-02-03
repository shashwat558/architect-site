import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }>} 
) {
  try {
    const { id } = await context.params;

    const offer = await prisma.offer.findUnique({
      where: { id },
    });

    if (!offer) {
      return NextResponse.json(
        { error: "Offer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(offer, { status: 200 });
  } catch (error) {
    console.error(`GET /api/offers/[id] error:`, error);
    return NextResponse.json(
      { error: "Failed to fetch offer" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }>}
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const offer = await prisma.offer.findUnique({
      where: { id },
    });

    if (!offer) {
      return NextResponse.json(
        { error: "Offer not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.offer.update({
      where: { id },
      data: {
        title: body.title ?? offer.title,
        description: body.description ?? offer.description,
        link: body.link ?? offer.link,
        ctaLabel: body.ctaLabel ?? offer.ctaLabel,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error(`PUT /api/offers/[id] error:`, error);
    return NextResponse.json(
      { error: "Failed to update offer" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }>}
) {
  try {
    const { id } = await context.params;

    const offer = await prisma.offer.findUnique({
      where: { id },
    });

    if (!offer) {
      return NextResponse.json(
        { error: "Offer not found" },
        { status: 404 }
      );
    }

    await prisma.offer.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Offer deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`DELETE /api/offers/[id] error:`, error);
    return NextResponse.json(
      { error: "Failed to delete offer" },
      { status: 500 }
    );
  }
}

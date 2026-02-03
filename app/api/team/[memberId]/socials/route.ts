import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: NextRequest,
  { params }: { params: { memberId: string } }
) {
  try {
    const { memberId } = params;

    const socials = await prisma.social.findMany({
      where: { memberId },
    });

    return NextResponse.json(socials, { status: 200 });
  } catch (error) {
    console.error("GET /api/team/[memberId]/socials error:", error);
    return NextResponse.json(
      { error: "Failed to fetch socials" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { memberId: string } }
) {
  try {
    const { memberId } = params;
    const body = await request.json();

    const { name, url } = body;

    if (!name || !url) {
      return NextResponse.json(
        { error: "Missing required fields: name, url" },
        { status: 400 }
      );
    }

    const member = await prisma.teamMember.findUnique({
      where: { id: memberId },
    });

    if (!member) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    const social = await prisma.social.create({
      data: {
        name,
        url,
        memberId,
      },
    });

    return NextResponse.json(social, { status: 201 });
  } catch (error) {
    console.error("POST /api/team/[memberId]/socials error:", error);
    return NextResponse.json(
      { error: "Failed to create social" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { memberId: string } }
) {
  try {
    const body = await request.json();
    const { socialId, name, url } = body;

    if (!socialId) {
      return NextResponse.json(
        { error: "Missing socialId" },
        { status: 400 }
      );
    }

    const social = await prisma.social.update({
      where: { id: socialId },
      data: {
        name: name,
        url: url,
      },
    });

    return NextResponse.json(social, { status: 200 });
  } catch (error) {
    console.error("PUT /api/team/[memberId]/socials error:", error);
    return NextResponse.json(
      { error: "Failed to update social" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { memberId: string } }
) {
  try {
    const body = await request.json();
    const { socialId } = body;

    if (!socialId) {
      return NextResponse.json(
        { error: "Missing socialId" },
        { status: 400 }
      );
    }

    await prisma.social.delete({
      where: { id: socialId },
    });

    return NextResponse.json(
      { message: "Social deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/team/[memberId]/socials error:", error);
    return NextResponse.json(
      { error: "Failed to delete social" },
      { status: 500 }
    );
  }
}

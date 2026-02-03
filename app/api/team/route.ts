import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const skip = parseInt(searchParams.get("skip") || "0");
    const take = parseInt(searchParams.get("take") || "10");

    const [members, total] = await Promise.all([
      prisma.teamMember.findMany({
        skip,
        take,
        include: {
          socials: true,
          projects: {
            include: {
              project: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.teamMember.count(),
    ]);

    return NextResponse.json(
      { members, total, skip, take },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/team error:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, title, image, bio } = body;

    if (!name || !title) {
      return NextResponse.json(
        { error: "Missing required fields: name, title" },
        { status: 400 }
      );
    }

    const member = await prisma.teamMember.create({
      data: {
        name,
        title,
        image: image || "",
        bio: bio || "",
        gallery: [],
      },
      include: {
        socials: true,
        projects: {
          include: {
            project: true,
          },
        },
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error("POST /api/team error:", error);
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
}

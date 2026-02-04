import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const skip = parseInt(searchParams.get("skip") || "0");
    const take = parseInt(searchParams.get("take") || "10");

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        skip,
        take,
        include: {
          meta: true,
          materials: true,
          team: true,
          testimonial: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.project.count(),
    ]);

    return NextResponse.json(
      { projects, total, skip, take },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { title, category, year, location, image, slug, heroImage, gallery } = body;

    if (!title || !category || !slug) {
      return NextResponse.json(
        { error: "Missing required fields: title, category, slug" },
        { status: 400 }
      );
    }

    const existingSlug = await prisma.project.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        category,
        year: year || new Date().getFullYear(),
        location: location || "",
        image: image || "",
        slug,
        link: `/projects/${slug}`,
        heroImage: heroImage || "",
        gallery: gallery || [],
      },
      include: {
        meta: true,
        materials: true,
        team: true,
        testimonial: true,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

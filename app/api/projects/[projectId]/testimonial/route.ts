import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;

    const testimonial = await prisma.testimonial.findUnique({
      where: { projectId },
    });

    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json(testimonial, { status: 200 });
  } catch (error) {
    console.error("GET /api/projects/[projectId]/testimonial error:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonial" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;
    const body = await request.json();
    const { text, author, role, image } = body;

    if (!text || !author) {
      return NextResponse.json(
        { error: "Missing required fields: text, author" },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const existing = await prisma.testimonial.findUnique({ where: { projectId } });
    if (existing) {
      return NextResponse.json(
        { error: "Testimonial already exists for this project" },
        { status: 409 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        text,
        author,
        role: role || null,
        image: image || null,
        projectId,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects/[projectId]/testimonial error:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;
    const body = await request.json();
    const { text, author, role, image } = body;

    const existing = await prisma.testimonial.findUnique({ where: { projectId } });
    if (!existing) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    const updated = await prisma.testimonial.update({
      where: { projectId },
      data: {
        text: text ?? existing.text,
        author: author ?? existing.author,
        role: role ?? existing.role,
        image: image ?? existing.image,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT /api/projects/[projectId]/testimonial error:", error);
    return NextResponse.json(
      { error: "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;

    const existing = await prisma.testimonial.findUnique({ where: { projectId } });
    if (!existing) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    await prisma.testimonial.delete({ where: { projectId } });

    return NextResponse.json({ message: "Testimonial deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/projects/[projectId]/testimonial error:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}

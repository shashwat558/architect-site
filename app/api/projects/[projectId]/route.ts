import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        meta: true,
        materials: true,
        team: {
          include: {
            member: {
              include: { socials: true },
            },
          },
        },
        testimonial: true,
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error(`GET /api/projects/[projectId] error:`, error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    const body = await request.json();

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.project.update({
      where: { id: projectId },
      data: {
        title: body.title ?? project.title,
        category: body.category ?? project.category,
        year: body.year ?? project.year,
        location: body.location ?? project.location,
        image: body.image ?? project.image,
        heroImage: body.heroImage ?? project.heroImage,
        link: body.link ?? project.link,
        gallery: body.gallery ?? project.gallery,
        nextProject: body.nextProject ?? project.nextProject,
      },
      include: {
        meta: true,
        materials: true,
        team: true,
        testimonial: true,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error(`PUT /api/projects/[projectId] error:`, error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    await prisma.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`DELETE /api/projects/[projectId] error:`, error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}

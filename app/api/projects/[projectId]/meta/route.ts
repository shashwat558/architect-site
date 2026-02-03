import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;

    const meta = await prisma.projectMeta.findMany({
      where: { projectId },
    });

    return NextResponse.json(meta, { status: 200 });
  } catch (error) {
    console.error("GET /api/projects/[projectId]/meta error:", error);
    return NextResponse.json(
      { error: "Failed to fetch project meta" },
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

    const { label, value } = body;

    if (!label || !value) {
      return NextResponse.json(
        { error: "Missing required fields: label, value" },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    const meta = await prisma.projectMeta.create({
      data: {
        label,
        value,
        projectId,
      },
    });

    return NextResponse.json(meta, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects/[projectId]/meta error:", error);
    return NextResponse.json(
      { error: "Failed to create project meta" },
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
    const { metaId, label, value } = body;

    if (!metaId) {
      return NextResponse.json(
        { error: "Missing metaId" },
        { status: 400 }
      );
    }

    const meta = await prisma.projectMeta.update({
      where: { id: metaId },
      data: {
        label: label,
        value: value,
      },
    });

    return NextResponse.json(meta, { status: 200 });
  } catch (error) {
    console.error("PUT /api/projects/[projectId]/meta error:", error);
    return NextResponse.json(
      { error: "Failed to update project meta" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const body = await request.json();
    const { metaId } = body;

    if (!metaId) {
      return NextResponse.json(
        { error: "Missing metaId" },
        { status: 400 }
      );
    }

    await prisma.projectMeta.delete({
      where: { id: metaId },
    });

    return NextResponse.json(
      { message: "Meta deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/projects/[projectId]/meta error:", error);
    return NextResponse.json(
      { error: "Failed to delete meta" },
      { status: 500 }
    );
  }
}

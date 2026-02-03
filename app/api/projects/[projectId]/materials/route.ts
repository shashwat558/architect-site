import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;

    const materials = await prisma.material.findMany({
      where: { projectId },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(materials, { status: 200 });
  } catch (error) {
    console.error("GET /api/projects/[projectId]/materials error:", error);
    return NextResponse.json(
      { error: "Failed to fetch materials" },
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
    const { name, description, image } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Missing required field: name" },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const material = await prisma.material.create({
      data: {
        name,
        description: description || null,
        image: image || null,
        projectId,
      },
    });

    return NextResponse.json(material, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects/[projectId]/materials error:", error);
    return NextResponse.json(
      { error: "Failed to create material" },
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
    const { materialId, name, description, image } = body;

    if (!materialId) {
      return NextResponse.json(
        { error: "Missing materialId" },
        { status: 400 }
      );
    }

    const material = await prisma.material.findUnique({ where: { id: materialId } });
    if (!material || material.projectId !== projectId) {
      return NextResponse.json({ error: "Material not found" }, { status: 404 });
    }

    const updated = await prisma.material.update({
      where: { id: materialId },
      data: {
        name: name ?? material.name,
        description: description ?? material.description,
        image: image ?? material.image,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT /api/projects/[projectId]/materials error:", error);
    return NextResponse.json(
      { error: "Failed to update material" },
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
    const body = await request.json();
    const { materialId } = body;

    if (!materialId) {
      return NextResponse.json(
        { error: "Missing materialId" },
        { status: 400 }
      );
    }

    const material = await prisma.material.findUnique({ where: { id: materialId } });
    if (!material || material.projectId !== projectId) {
      return NextResponse.json({ error: "Material not found" }, { status: 404 });
    }

    await prisma.material.delete({ where: { id: materialId } });

    return NextResponse.json({ message: "Material deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/projects/[projectId]/materials error:", error);
    return NextResponse.json(
      { error: "Failed to delete material" },
      { status: 500 }
    );
  }
}

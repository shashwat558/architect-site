import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;

    const assignments = await prisma.teamOnProject.findMany({
      where: { projectId },
      include: {
        member: {
          include: { socials: true },
        },
      },
      orderBy: { memberId: "asc" },
    });

    return NextResponse.json(assignments, { status: 200 });
  } catch (error) {
    console.error("GET /api/projects/[projectId]/team error:", error);
    return NextResponse.json(
      { error: "Failed to fetch project team" },
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
    const { memberId, role } = body;

    if (!memberId) {
      return NextResponse.json(
        { error: "Missing required field: memberId" },
        { status: 400 }
      );
    }

    const [project, member] = await Promise.all([
      prisma.project.findUnique({ where: { id: projectId } }),
      prisma.teamMember.findUnique({ where: { id: memberId } }),
    ]);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (!member) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    const existing = await prisma.teamOnProject.findUnique({
      where: { memberId_projectId: { memberId, projectId } },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Member already assigned to project" },
        { status: 409 }
      );
    }

    const assignment = await prisma.teamOnProject.create({
      data: { memberId, projectId, role: role || null },
      include: {
        member: {
          include: { socials: true },
        },
      },
    });

    return NextResponse.json(assignment, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects/[projectId]/team error:", error);
    return NextResponse.json(
      { error: "Failed to assign team member" },
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
    const { memberId, role } = body;

    if (!memberId) {
      return NextResponse.json(
        { error: "Missing memberId" },
        { status: 400 }
      );
    }

    const existing = await prisma.teamOnProject.findUnique({
      where: { memberId_projectId: { memberId, projectId } },
    });

    if (!existing) {
      return NextResponse.json({ error: "Assignment not found" }, { status: 404 });
    }

    const updated = await prisma.teamOnProject.update({
      where: { memberId_projectId: { memberId, projectId } },
      data: { role: role ?? existing.role },
      include: {
        member: {
          include: { socials: true },
        },
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT /api/projects/[projectId]/team error:", error);
    return NextResponse.json(
      { error: "Failed to update assignment" },
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
    const { memberId } = body;

    if (!memberId) {
      return NextResponse.json(
        { error: "Missing memberId" },
        { status: 400 }
      );
    }

    const existing = await prisma.teamOnProject.findUnique({
      where: { memberId_projectId: { memberId, projectId } },
    });

    if (!existing) {
      return NextResponse.json({ error: "Assignment not found" }, { status: 404 });
    }

    await prisma.teamOnProject.delete({
      where: { memberId_projectId: { memberId, projectId } },
    });

    return NextResponse.json({ message: "Assignment removed" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/projects/[projectId]/team error:", error);
    return NextResponse.json(
      { error: "Failed to remove assignment" },
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/prisma";
import { deleteMultipleImages, safeDeleteImage } from "@/lib/cloudinary";
import { requireAuth } from "@/lib/api-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ memberId: string }> }
) {
  try {
    const { memberId } = await params;

    const member = await prisma.teamMember.findUnique({
      where: { id: memberId },
      include: {
        socials: true,
        projects: {
          include: {
            project: true,
          },
        },
      },
    });

    if (!member) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(member, { status: 200 });
  } catch (error) {
    console.error(`GET /api/team/[memberId] error:`, error);
    return NextResponse.json(
      { error: "Failed to fetch team member" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ memberId: string }> }
) {
  try {
    const unauthorized = await requireAuth();
    if (unauthorized) return unauthorized;

    const { memberId } = await params;
    const body = await request.json();

    const member = await prisma.teamMember.findUnique({
      where: { id: memberId },
    });

    if (!member) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    // Delete old images from Cloudinary if they're being replaced
    const deletePromises = [];
    
    // Delete old main image if replaced
    if (body.image && body.image !== member.image && member.image) {
      deletePromises.push(safeDeleteImage(member.image));
    }
    
    // Delete removed gallery images
    if (body.gallery && member.gallery) {
      const newGallery = body.gallery as string[];
      const oldGallery = member.gallery as string[];
      const removedImages = oldGallery.filter(img => !newGallery.includes(img));
      
      if (removedImages.length > 0) {
        deletePromises.push(deleteMultipleImages(removedImages));
      }
    }

    // Execute all deletions in parallel (non-blocking)
    if (deletePromises.length > 0) {
      Promise.allSettled(deletePromises).catch(err => 
        console.error("Failed to delete some old team member images:", err)
      );
    }

    const updated = await prisma.teamMember.update({
      where: { id: memberId },
      data: {
        name: body.name ?? member.name,
        title: body.title ?? member.title,
        image: body.image ?? member.image,
        bio: body.bio ?? member.bio,
        gallery: body.gallery ?? member.gallery,
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

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error(`PUT /api/team/[memberId] error:`, error);
    return NextResponse.json(
      { error: "Failed to update team member" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ memberId: string }> }
) {
  try {
    const unauthorized = await requireAuth();
    if (unauthorized) return unauthorized;

    const { memberId } = await params;

    const member = await prisma.teamMember.findUnique({
      where: { id: memberId },
    });

    if (!member) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    // Collect all images to delete from Cloudinary
    const imagesToDelete = [
      member.image,
      ...(member.gallery || [])
    ].filter(Boolean);

    // Delete images from Cloudinary (non-blocking)
    if (imagesToDelete.length > 0) {
      deleteMultipleImages(imagesToDelete).catch(err => 
        console.error("Failed to delete team member images from Cloudinary:", err)
      );
    }

    await prisma.teamMember.delete({
      where: { id: memberId },
    });

    return NextResponse.json(
      { message: "Team member deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`DELETE /api/team/[memberId] error:`, error);
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}

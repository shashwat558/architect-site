import { prisma } from "@/lib/prisma";
import { deleteMultipleImages, safeDeleteImage } from "@/lib/cloudinary";
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

    // Delete old images from Cloudinary if they're being replaced
    const deletePromises = [];
    
    // Delete old main image if replaced
    if (body.image && body.image !== project.image && project.image) {
      deletePromises.push(safeDeleteImage(project.image));
    }
    
    // Delete old hero image if replaced
    if (body.heroImage && body.heroImage !== project.heroImage && project.heroImage) {
      deletePromises.push(safeDeleteImage(project.heroImage));
    }
    
    // Delete removed gallery images
    if (body.gallery && project.gallery) {
      const newGallery = body.gallery as string[];
      const oldGallery = project.gallery as string[];
      const removedImages = oldGallery.filter(img => !newGallery.includes(img));
      
      if (removedImages.length > 0) {
        deletePromises.push(deleteMultipleImages(removedImages));
      }
    }

    // Delete removed process gallery images
    if (body.processGallery && project.processGallery) {
      const newProcessGallery = body.processGallery as string[];
      const oldProcessGallery = project.processGallery as string[];
      const removedProcessImages = oldProcessGallery.filter(img => !newProcessGallery.includes(img));
      
      if (removedProcessImages.length > 0) {
        deletePromises.push(deleteMultipleImages(removedProcessImages));
      }
    }

    // Execute all deletions in parallel (non-blocking)
    if (deletePromises.length > 0) {
      Promise.allSettled(deletePromises).catch(err => 
        console.error("Failed to delete some old images:", err)
      );
    }

    const updated = await prisma.project.update({
      where: { id: projectId },
      data: {
        title: body.title ?? project.title,
        subtitle: body.subtitle !== undefined ? body.subtitle : project.subtitle,
        category: body.category ?? project.category,
        year: body.year ?? project.year,
        location: body.location ?? project.location,
        brief: body.brief !== undefined ? body.brief : project.brief,
        approach: body.approach !== undefined ? body.approach : project.approach,
        image: body.image ?? project.image,
        heroImage: body.heroImage ?? project.heroImage,
        slug: body.slug ?? project.slug,
        link: body.slug ? `/projects/${body.slug}` : project.link,
        gallery: body.gallery ?? project.gallery,
        processGallery: body.processGallery ?? project.processGallery,
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

    // Collect all images to delete from Cloudinary
    const imagesToDelete = [
      project.image,
      project.heroImage,
      ...(project.gallery || []),
      ...(project.processGallery || [])
    ].filter(Boolean);

    // Delete images from Cloudinary (non-blocking)
    if (imagesToDelete.length > 0) {
      deleteMultipleImages(imagesToDelete).catch(err => 
        console.error("Failed to delete some images from Cloudinary:", err)
      );
    }

    // Delete project from database
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

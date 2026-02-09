import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import {
  heroData,
  projectsSectionData,
  testimonialsSectionData,
} from "@/app/data/dummyData";

export const runtime = "nodejs";

const dataFilePath = path.join(
  process.cwd(),
  "app",
  "data",
  "home-images.json"
);

type HomeImagesPayload = {
  heroImages: string[];
  projectImages: string[];
  testimonialImages: string[];
};

const defaultPayload: HomeImagesPayload = {
  heroImages: heroData.images.map((image) => image.src),
  projectImages: projectsSectionData.projects.map((project) => project.image),
  testimonialImages: testimonialsSectionData.testimonials
    .map((testimonial) => testimonial.image || "")
    .filter(Boolean),
};

const readHomeImages = async (): Promise<HomeImagesPayload> => {
  try {
    const file = await fs.readFile(dataFilePath, "utf-8");
    const parsed = JSON.parse(file) as Partial<HomeImagesPayload>;

    return {
      heroImages: parsed.heroImages || defaultPayload.heroImages,
      projectImages: parsed.projectImages || defaultPayload.projectImages,
      testimonialImages:
        parsed.testimonialImages || defaultPayload.testimonialImages,
    };
  } catch {
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
    await fs.writeFile(
      dataFilePath,
      JSON.stringify(defaultPayload, null, 2)
    );
    return defaultPayload;
  }
};

const writeHomeImages = async (payload: HomeImagesPayload) => {
  await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
  await fs.writeFile(dataFilePath, JSON.stringify(payload, null, 2));
};

export async function GET() {
  try {
    const payload = await readHomeImages();
    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error("GET /api/home-images error:", error);
    return NextResponse.json(
      { error: "Failed to load home images" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as Partial<HomeImagesPayload>;

    const payload: HomeImagesPayload = {
      heroImages: Array.isArray(body.heroImages) ? body.heroImages : [],
      projectImages: Array.isArray(body.projectImages) ? body.projectImages : [],
      testimonialImages: Array.isArray(body.testimonialImages)
        ? body.testimonialImages
        : [],
    };

    await writeHomeImages(payload);

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error("PUT /api/home-images error:", error);
    return NextResponse.json(
      { error: "Failed to save home images" },
      { status: 500 }
    );
  }
}

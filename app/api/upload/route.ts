import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";
import { requireAuth } from "@/lib/api-auth";

/**
 * Upload Image Endpoint
 *
 * Accepts multipart/form-data with:
 * - file: Image file (required)
 * - folder: Target folder in Cloudinary (optional, defaults to 'adrs')
 *
 * Returns: { url: string } - Cloudinary URL
 */
export async function POST(request: Request) {
  try {
    const unauthorized = await requireAuth();
    if (unauthorized) return unauthorized;

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "adrs";

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type" },
        { status: 400 }
      );
    }

    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large (max 10MB)" },
        { status: 400 }
      );
    }

    // Convert to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload
    const url = await uploadImage(base64, folder);

    return NextResponse.json({ url }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

/**
 * Health check
 */
export async function GET() {
  return NextResponse.json({
    message: "Image upload endpoint",
    maxSize: "10MB",
    supportedFormats: ["JPEG", "PNG", "WEBP", "GIF"],
  });
}

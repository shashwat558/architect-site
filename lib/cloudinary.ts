import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

/**
 * Upload image to Cloudinary
 * @param file - File buffer or base64 string
 * @param folder - Cloudinary folder path (e.g., 'projects', 'team', 'materials')
 * @returns Cloudinary URL
 */
export async function uploadImage(
  file: string | Buffer,
  folder: string = "adrs"
): Promise<string> {
  try {
    const fileToUpload = Buffer.isBuffer(file)
      ? `data:image/png;base64,${file.toString("base64")}`
      : file;
    const result = await cloudinary.uploader.upload(fileToUpload, {
      folder: folder,
      resource_type: "image",
      transformation: [
        { quality: "auto", fetch_format: "auto" },
        { width: 2000, crop: "limit" },
      ],
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
}

/**
 * Delete image from Cloudinary
 * @param publicId - Cloudinary public ID extracted from URL
 */
export async function deleteImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw new Error("Failed to delete image from Cloudinary");
  }
}

/**
 * Extract public ID from Cloudinary URL
 * @param url - Full Cloudinary URL
 * @returns Public ID or null if invalid URL
 */
export function extractPublicId(url: string): string | null {
  try {
    const matches = url.match(/\/([^/]+\/[^/.]+)\.(jpg|jpeg|png|gif|webp)$/i);
    return matches ? matches[1] : null;
  } catch {
    return null;
  }
}

/**
 * Safely delete image from Cloudinary URL (doesn't throw on error)
 * @param url - Full Cloudinary URL
 */
export async function safeDeleteImage(url: string): Promise<void> {
  if (!url) return;
  
  try {
    const publicId = extractPublicId(url);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.error(`Failed to delete image ${url}:`, error);
    // Don't throw - we don't want to fail the entire operation if image deletion fails
  }
}

/**
 * Delete multiple images from Cloudinary
 * @param urls - Array of Cloudinary URLs
 */
export async function deleteMultipleImages(urls: string[]): Promise<void> {
  const deletePromises = urls
    .filter(url => url) // Filter out empty strings
    .map(url => safeDeleteImage(url));
  
  await Promise.allSettled(deletePromises);
}

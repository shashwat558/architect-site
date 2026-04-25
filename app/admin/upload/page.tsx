"use client";

import { useState } from "react";
import Image from "next/image";

export default function UploadPage() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [folder, setFolder] = useState("adrs");
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    setImageUrl("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Upload failed");
      }

      const { url } = await res.json();
      setImageUrl(url);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to upload image";
      setError(message);
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(imageUrl);
    alert("URL copied to clipboard!");
  };

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Upload Images</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Upload images to Cloudinary</p>
      </div>

      <div className="bg-white shadow rounded-lg p-4 sm:p-6 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Folder
            </label>
            <select
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="adrs">General (adrs)</option>
              <option value="projects">Projects</option>
              <option value="team">Team</option>
              <option value="materials">Materials</option>
              <option value="testimonials">Testimonials</option>
              <option value="offers">Offers</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image File
            </label>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              onChange={handleUpload}
              disabled={uploading}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100
                disabled:opacity-50"
            />
            <p className="mt-2 text-sm text-gray-500">
              Supported: JPEG, PNG, WEBP, GIF • Max size: 10MB
            </p>
          </div>

          {uploading && (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <span className="ml-3 text-gray-700">Uploading...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {imageUrl && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                <p className="text-sm font-medium text-green-800">
                  ✓ Upload successful!
                </p>
                <button
                  onClick={copyToClipboard}
                  className="text-sm bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 self-start sm:self-auto min-h-11"
                >
                  Copy URL
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    Image URL:
                  </p>
                  <input
                    type="text"
                    value={imageUrl}
                    readOnly
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md break-all"
                    onClick={(e) => e.currentTarget.select()}
                  />
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-700 mb-2">
                    Preview:
                  </p>
                  <div className="relative w-full aspect-video">
                    <Image
                      src={imageUrl}
                      alt="Uploaded"
                      fill
                      sizes="(max-width: 640px) 100vw, 600px"
                      className="object-contain rounded-md border border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            How to use:
          </h3>
          <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
            <li>Select the appropriate folder for organization</li>
            <li>Choose an image file (max 10MB)</li>
            <li>Wait for upload to complete</li>
            <li>Copy the URL and paste it into your form fields</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

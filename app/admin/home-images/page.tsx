"use client";

import { useEffect, useState } from "react";
import { MultiImageUpload } from "../components/MultiImageUpload";

export default function HomeImagesPage() {
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [testimonialImages, setTestimonialImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/home-images");
        if (!res.ok) {
          throw new Error("Failed to load home images");
        }
        const data = await res.json();
        setHeroImages(data.heroImages || []);
        setProjectImages(data.projectImages || []);
        setTestimonialImages(data.testimonialImages || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load images");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/home-images", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heroImages,
          projectImages,
          testimonialImages,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save images");
      }

      setSuccess("Home page images updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save images");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-4 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Home Page Images
        </h1>
        <p className="text-gray-600 mt-2">
          Select images for the landing page carousel and other image sections.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600" />
        </div>
      ) : (
        <div className="space-y-10">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
              {success}
            </div>
          )}

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Hero Carousel
            </h2>
            <MultiImageUpload
              value={heroImages}
              onChange={setHeroImages}
              folder="adrs/home/hero"
              label="Hero Carousel Images"
              maxImages={12}
            />
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Projects Carousel
            </h2>
            <MultiImageUpload
              value={projectImages}
              onChange={setProjectImages}
              folder="adrs/home/projects"
              label="Project Carousel Images"
              maxImages={12}
            />
            <p className="text-xs text-gray-500 mt-2">
              Images are applied in order to the project cards shown on the home
              page.
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Testimonial Avatars
            </h2>
            <MultiImageUpload
              value={testimonialImages}
              onChange={setTestimonialImages}
              folder="adrs/home/testimonials"
              label="Testimonial Images"
              maxImages={12}
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center px-6 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { notFound } from "next/navigation";
import { client } from "../../../sanity/lib/client";
import { projectBySlugQuery, projectSlugsQuery } from "../../../sanity/lib/queries";
import { sanityImg, type SanityImageObject } from "../../../sanity/lib/sanityImage";
import ProjectDetailClient from "./ProjectDetailClient";

// ── Types ─────────────────────────────────────────────────────────────────────

// Raw Sanity shape (image fields are full objects — optimized URLs are built
// in toProjectDetail so the client component keeps receiving plain strings).
type SanityGalleryImage = SanityImageObject & {
  src: string;
  alt?: string;
  label?: string;
  width?: string;
  aspectRatio?: string;
};

export type SanityProjectDetail = {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  category: string;
  heroImage: SanityImageObject | string;
  meta: { label: string; value: string }[];
  brief: string;
  approach: string;
  challenge?: string;
  solution?: string;
  materials: { name: string; origin: string }[];
  gallery: SanityGalleryImage[];
  processGallery: SanityGalleryImage[];
  testimonial: { text: string; author: string; role: string };
  team: { role: string; name: string }[];
};

// What ProjectDetailClient actually renders (all images are final URLs).
export type ProjectDetail = Omit<SanityProjectDetail, "heroImage" | "gallery" | "processGallery"> & {
  heroImage: string;
  gallery: { src: string; alt?: string; width?: string; aspectRatio?: string }[];
  processGallery: { src: string; alt?: string; width?: string; aspectRatio?: string }[];
};

/** Build right-sized CDN URLs (AVIF/WebP) for every image on the page. */
function toProjectDetail(p: SanityProjectDetail): ProjectDetail {
  const mapGallery = (items: SanityGalleryImage[], width: number) =>
    (items ?? []).map((img) => ({
      src: sanityImg(img, width) || img.src || "",
      alt: img.alt,
      width: img.width,
      aspectRatio: img.aspectRatio,
    }));

  return {
    ...p,
    heroImage: sanityImg(p.heroImage, 1920) || (typeof p.heroImage === "string" ? p.heroImage : ""),
    gallery: mapGallery(p.gallery, 1400),
    processGallery: mapGallery(p.processGallery, 1000),
  };
}

// ── Static params (optional pre-rendering) ────────────────────────────────────

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(projectSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const raw: SanityProjectDetail | null = await client.fetch(
    projectBySlugQuery,
    { slug },
    { next: { revalidate: 600 } }
  );

  if (!raw) return { title: "Project Not Found" };
  const project = toProjectDetail(raw);

  return {
    title: `${project.title} | Ad.Rs Design Studio`,
    description: project.brief?.slice(0, 155),
    openGraph: {
      title: project.title,
      description: project.brief?.slice(0, 155),
      images: project.heroImage ? [{ url: project.heroImage }] : [],
    },
  };
}

// ── Page (Server Component) ───────────────────────────────────────────────────

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const raw: SanityProjectDetail | null = await client.fetch(
    projectBySlugQuery,
    { slug },
    { next: { revalidate: 600 } }
  );

  if (!raw) notFound();

  return <ProjectDetailClient project={toProjectDetail(raw)} />;
}
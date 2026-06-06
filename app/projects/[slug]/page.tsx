import { notFound } from "next/navigation";
import { client } from "../../../sanity/lib/client";
import { projectBySlugQuery, projectSlugsQuery } from "../../../sanity/lib/queries";
import ProjectDetailClient from "./ProjectDetailClient";

// ── Types ─────────────────────────────────────────────────────────────────────

export type SanityProjectDetail = {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  category: string;
  heroImage: string;
  meta: { label: string; value: string }[];
  brief: string;
  approach: string;
  challenge?: string;
  solution?: string;
  materials: { name: string; origin: string }[];
  gallery: { src: string; alt?: string; width: string; aspectRatio: string }[];
  processGallery: { src: string; alt?: string; width: string; aspectRatio: string }[];
  testimonial: { text: string; author: string; role: string };
  team: { role: string; name: string }[];
};

// ── Static params (optional pre-rendering) ────────────────────────────────────

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(projectSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project: SanityProjectDetail | null = await client.fetch(
    projectBySlugQuery,
    { slug },
    { next: { revalidate: 60 } }
  );

  if (!project) return { title: "Project Not Found" };

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

  const project: SanityProjectDetail | null = await client.fetch(
    projectBySlugQuery,
    { slug },
    { next: { revalidate: 60 } }
  );

  if (!project) notFound();

  return <ProjectDetailClient project={project} />;
}
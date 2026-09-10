import { MetadataRoute } from "next";

const baseUrl = "https://adrs-design.com";

export const revalidate = 3600; // Re-generate hourly

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/process`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  let projectPages: MetadataRoute.Sitemap = [];
  try {
    const { client } = await import("../sanity/lib/client");
    const projects = await client.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "project" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt
      }`
    );
    projectPages = projects.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (err) {
    console.error("[Sitemap] Failed to fetch projects from Sanity:", err);
    // Fall back to static set.
  }

  return [...staticPages, ...projectPages];
}

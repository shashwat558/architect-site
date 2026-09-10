import type { Metadata } from "next";
import HomeClient from "./home-client";
import { client } from "../sanity/lib/client";
import {
  featuredProjectsQuery,
  siteContentQuery,
  siteSettingsQuery,
  testimonialsQuery,
} from "../sanity/lib/queries";
import { sanityImg, type SanityImageObject } from "../sanity/lib/sanityImage";
import {
  heroData,
  offersSectionData,
  pillarsSectionData,
  projectCTAData,
  projectsSectionData,
  testimonialsSectionData,
} from "./data/content";
import type {
  OffersSectionData,
  PillarsSectionData,
  ProjectCTAData,
  ProjectsSectionData,
  TestimonialsSectionData,
} from "./data/types";

const baseUrl = "https://adrs-design.com";

export const metadata: Metadata = {
  title: "Architects & Interior Designers in Bhopal | Ad.Rs Studio",
  description:
    "Ad.Rs Design Studio is a Bhopal-based architecture and interior design firm since 2017. We deliver residential, commercial, modular kitchens, and landscape design near Berkheda.",
  keywords: [
    "architects in Bhopal",
    "interior designers in Bhopal",
    "best architecture firm near Berkheda",
    "residential interior design Bhopal",
    "commercial interior designers Bhopal",
    "architecture",
    "interior design",
    "modular kitchens",
    "landscape design",
    "Ad.Rs Design Studio",
    "Bhopal",
  ],
  alternates: {
    canonical: `${baseUrl}/`,
  },
  openGraph: {
    title: "Architects & Interior Designers in Bhopal | Ad.Rs Studio",
    description:
      "Local architects and interior designers in Bhopal since 2017. Residential, commercial, modular kitchens, and landscape design near Berkheda, New Minal Residency.",
    url: `${baseUrl}/`,
    siteName: "Ad.Rs Design Studio",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://adrs-design.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ad.Rs Design Studio - Architects & Interior Designers in Bhopal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Architects & Interior Designers in Bhopal | Ad.Rs Studio",
    description:
      "Bhopal-based architecture and interior design studio since 2017. Residential, commercial, modular kitchens, and landscape projects near Berkheda.",
    images: ["https://adrs-design.com/twitter-image.png"],
  },
};

// ── Sanity types ───────────────────────────────────────────────────────────────

type SanityProject = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  heroImage: SanityImageObject | string;
  meta?: { label: string; value: string }[];
};

type SiteSettings = {
  homeHero?: {
    backgroundImage?: SanityImageObject | null;
  } | null;
};

type SanityTestimonial = {
  _id: string;
  text: string;
  author: string;
  role?: string;
  project?: string;
  avatar?: SanityImageObject | null;
  rating?: number;
};

type SanityHeroSlide = {
  image: SanityImageObject;
  caption: string;
};

type SanityPillar = {
  pid?: string;
  title: string;
  description?: string;
  points?: { highlight?: string; text: string }[];
  outro?: string;
  link?: string;
};

type SanityOffer = {
  title: string;
  description?: string;
  link?: string;
  ctaLabel?: string;
};

type SiteContent = {
  heroSlides?: SanityHeroSlide[] | null;
  testimonialsHeader?: { eyebrow?: string; title?: string; subtitle?: string } | null;
  pillarsHeader?: { eyebrow?: string; title?: string; subtitle?: string; backgroundText?: string } | null;
  pillars?: SanityPillar[] | null;
  offersHeader?: { eyebrow?: string } | null;
  offers?: SanityOffer[] | null;
} | null;

// ── Data mappers ───────────────────────────────────────────────────────────────

function toProjectCard(p: SanityProject, i: number) {
  return {
    id: i + 1,
    title: p.title,
    category: p.category ?? "Architecture",
    year: p.meta?.find((m) => m.label === "Year")?.value ?? "",
    // Right-sized Sanity CDN URL (AVIF/WebP via auto=format); falls back to
    // the raw string when the field is a plain URL.
    image: sanityImg(p.heroImage, 900) || "",
    link: `/projects/${p.slug}`,
  };
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function Home() {
  // Fetch live content from Sanity in parallel (settings fetch is guarded —
  // the homepage must survive a settings outage; section queries fall back
  // to static data when empty).
  const [sanityProjects, siteSettings, sanityTestimonials, siteContent] = await Promise.all([
    client.fetch<SanityProject[]>(featuredProjectsQuery, {}, { next: { revalidate: 300 } }),
    client
      .fetch<SiteSettings | null>(siteSettingsQuery, {}, { next: { revalidate: 300 } })
      .catch(() => null),
    client
      .fetch<SanityTestimonial[]>(testimonialsQuery, {}, { next: { revalidate: 300 } })
      .catch(() => [] as SanityTestimonial[]),
    client
      .fetch<SiteContent>(siteContentQuery, {}, { next: { revalidate: 300 } })
      .catch(() => null),
  ]);

  // (teamMembersQuery not needed on home — team shown as ConstructImage teaser only)

  // Build projectsSectionData — fall back to static if Sanity is empty
  const liveProjectsSection: ProjectsSectionData =
    sanityProjects.length > 0
      ? {
        ...projectsSectionData,
        projects: sanityProjects.map(toProjectCard),
      }
      : projectsSectionData;

  // Testimonials — live docs first, static fallback when empty
  const liveTestimonials: TestimonialsSectionData =
    sanityTestimonials.length > 0
      ? {
          eyebrow:
            siteContent?.testimonialsHeader?.eyebrow ?? testimonialsSectionData.eyebrow,
          title: siteContent?.testimonialsHeader?.title ?? testimonialsSectionData.title,
          subtitle:
            siteContent?.testimonialsHeader?.subtitle ?? testimonialsSectionData.subtitle,
          testimonials: sanityTestimonials.map((t, i) => ({
            id: i + 1,
            text: t.text,
            author: t.author,
            role: t.role ?? "",
            project: t.project,
            image: sanityImg(t.avatar, 200) || undefined,
            rating: t.rating ?? 5,
          })),
        }
      : testimonialsSectionData;

  // Pillars — live docs first, static fallback when empty
  const livePillars: PillarsSectionData =
    (siteContent?.pillars?.length ?? 0) > 0
      ? {
          eyebrow: siteContent?.pillarsHeader?.eyebrow ?? pillarsSectionData.eyebrow,
          title: siteContent?.pillarsHeader?.title ?? pillarsSectionData.title,
          subtitle: siteContent?.pillarsHeader?.subtitle ?? pillarsSectionData.subtitle,
          backgroundText:
            siteContent?.pillarsHeader?.backgroundText ?? pillarsSectionData.backgroundText,
          pillars: (siteContent?.pillars ?? []).map((p, i) => ({
            id: p.pid ?? String(i + 1).padStart(2, "0"),
            title: p.title,
            description: p.description,
            points: p.points,
            outro: p.outro,
            link: p.link ?? "/process",
          })),
        }
      : pillarsSectionData;

  // Offers — live docs first, static fallback when empty
  const liveOffers: OffersSectionData =
    (siteContent?.offers?.length ?? 0) > 0
      ? {
          eyebrow: siteContent?.offersHeader?.eyebrow ?? offersSectionData.eyebrow,
          offers: (siteContent?.offers ?? []).map((o) => ({
            title: o.title,
            description: o.description ?? "",
            link: o.link ?? "/contact",
            ctaLabel: o.ctaLabel ?? "Learn more",
          })),
        }
      : offersSectionData;

  // Hero carousel slides — live Sanity images, static local files as fallback
  const heroSlides = (siteContent?.heroSlides ?? [])
    .map((s) => ({
      src: sanityImg(s.image, 800),
      caption: s.caption,
    }))
    .filter((s) => s.src && s.caption);


  return (
    <HomeClient
      heroData={heroData}
      heroBgUrl={sanityImg(siteSettings?.homeHero?.backgroundImage, 1920) || undefined}
      heroSlides={heroSlides.length > 0 ? heroSlides : undefined}
      projectsSectionData={liveProjectsSection}
      pillarsSectionData={livePillars}
      offersSectionData={liveOffers}
      testimonialsSectionData={liveTestimonials}
      projectCTAData={projectCTAData}
    />
  );
}

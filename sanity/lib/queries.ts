import { groq } from 'next-sanity'

// ─── Home: Featured Projects ──────────────────────────────────────────────────

/** 4 featured projects for the home page carousel */
export const featuredProjectsQuery = groq`
  *[_type == "project" && isFeatured == true] | order(_createdAt asc) [0...4] {
    _id,
    title,
    "slug": slug.current,
    category,
    // Full image object (asset ref + hotspot/crop + alt) — callers build
    // right-sized CDN URLs with the sanityImg() helper instead of raw originals.
    heroImage,
    meta[label in ["Year", "Location"]],
  }
`

// ─── Team Members ─────────────────────────────────────────────────────────────

/** All team members ordered by displayOrder */
export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(displayOrder asc) {
    _id,
    name,
    role,
    "slug": slug.current,
    image,
    displayOrder,
  }
`

// ─── Projects Listing ─────────────────────────────────────────────────────────

/** Lightweight fields for the /projects grid */
export const projectsListQuery = groq`
  *[_type == "project"] | order(_createdAt asc) {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    category,
    status,
    isFeatured,
    heroImage,
    meta,
  }
`

// ─── Project Detail ───────────────────────────────────────────────────────────

/** Full fields for a single project detail page */
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    category,
    status,
    isFeatured,
    heroImage,
    meta,
    brief,
    approach,
    challenge,
    solution,
    materials[] {
      name,
      origin,
    },
    // Spread keeps the full image object (hotspot/crop + width/aspectRatio/alt
    // or label subfields); src stays as the unoptimized raw fallback.
    gallery[] {
      ...,
      "src": asset->url,
    },
    processGallery[] {
      ...,
      "src": asset->url,
    },
    testimonial {
      text,
      author,
      role,
    },
    team[] {
      role,
      name,
    },
  }
`

/** Slugs for generateStaticParams */
export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }
`

// ─── Site Settings (singleton) ──────────────────────────────────────────────

/**
 * Global brand imagery + settings. Prefers the `siteSettings` singleton the
 * Studio edits; falls back to the most recently updated settings doc (so
 * older seeded datasets keep working until the singleton is created).
 */
export const siteSettingsQuery = groq`
  coalesce(
    *[_id == "siteSettings"][0],
    *[_type == "siteSettings"] | order(_updatedAt desc) [0]
  ) {
    siteName,
    logo,
    homeHero,
    processHeroImage,
    footerBackground,
    contactInfo,
    socialLinks,
  }
`

// ─── Testimonials ───────────────────────────────────────────────────────────

/** All testimonials ordered by displayOrder */
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(displayOrder asc) {
    _id,
    text,
    author,
    role,
    project,
    avatar,
    rating,
    displayOrder,
  }
`

// ─── Site Content (singleton) ───────────────────────────────────────────────

/**
 * Homepage sections (hero slides, pillars, offers + headers). Prefers the
 * `siteContent` singleton; falls back to the newest siteContent doc.
 */
export const siteContentQuery = groq`
  coalesce(
    *[_id == "siteContent"][0],
    *[_type == "siteContent"] | order(_updatedAt desc) [0]
  ) {
    heroSlides,
    testimonialsHeader,
    pillarsHeader,
    pillars,
    offersHeader,
    offers,
  }
`

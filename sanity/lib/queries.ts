import { groq } from 'next-sanity'

// ─── Home: Featured Projects ──────────────────────────────────────────────────

/** 4 featured projects for the home page carousel */
export const featuredProjectsQuery = groq`
  *[_type == "project" && isFeatured == true] | order(_createdAt asc) [0...4] {
    _id,
    title,
    "slug": slug.current,
    category,
    "heroImage": heroImage.asset->url,
    meta,
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
    "image": image.asset->url,
    bio,
    socialLinks,
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
    "heroImage": heroImage.asset->url,
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
    "heroImage": heroImage.asset->url,
    meta,
    brief,
    approach,
    challenge,
    solution,
    materials[] {
      name,
      origin,
    },
    gallery[] {
      "src": asset->url,
      alt,
      width,
      aspectRatio,
    },
    processGallery[] {
      "src": asset->url,
      alt,
      width,
      aspectRatio,
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

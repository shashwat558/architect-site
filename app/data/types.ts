/**
 * Shared data-layer types for Ad.Rs Design Studio.
 *
 * Keep types here; keep data values in `./content.ts`.
 * Import from this file anywhere you need shape-only knowledge.
 */

export type HeroImage = {
  src: string;
  alt: string;
};

export type HeroData = {
  headline: string;
  highlighted: string;
  description: string;
  images: HeroImage[];
};

export type ProjectCard = {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  link: string;
  location?: string;
};

export type ProjectsSectionData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  dragHint: string;
  projects: ProjectCard[];
};

export type ProjectsContentData = {
  heading: string;
  categories: string[];
  projects: ProjectCard[];
  emptyMessage: string;
};

export type OfferItem = {
  title: string;
  description: string;
  link: string;
  ctaLabel: string;
};

export type OffersSectionData = {
  eyebrow: string;
  offers: OfferItem[];
};

export type PillarPoint = {
  text: string;
  highlight?: string;
};

export type PillarItem = {
  id: string;
  title: string;
  description?: string;
  points?: PillarPoint[];
  outro?: string;
  link: string;
};

export type PillarsSectionData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  backgroundText: string;
  pillars: PillarItem[];
};

export type ProjectCTAData = {
  headline: string;
  subheadline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  footerLabel: string;
};

export type SocialLink = {
  name: string;
  url: string;
};

export type TeamMember = {
  id: number;
  name: string;
  title: string;
  image: string;
  bio: string;
  gallery: string[];
  socials: SocialLink[];
};

export type TeamSectionData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  members: TeamMember[];
};

export type Testimonial = {
  id: number;
  text: string;
  author: string;
  role: string;
  project?: string;
  image?: string;
  rating?: number;
};

export type TestimonialsSectionData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
};

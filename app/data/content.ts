/**
 * Site-wide content data for Ad.Rs Design Studio.
 *
 * This is the single source of truth for all static page content.
 * Import specific named exports where needed — tree-shaking ensures
 * only the used data ends up in each page bundle.
 */

import type {
  HeroData,
  ProjectsSectionData,
  ProjectsContentData,
  OffersSectionData,
  PillarsSectionData,
  ProjectCTAData,
  TeamSectionData,
  TestimonialsSectionData,
} from "./types";

// Re-export types so consumers can import everything from one place
export type * from "./types";

// ─── Hero ────────────────────────────────────────────────────────────────────

export const heroData: HeroData = {
  headline: "Quiet spaces,",
  highlighted: "profound feeling.",
  description:
    "Architecture as an emotional canvas. We design environments that breathe, listen, and hold the essence of life.",
  // Fallback slides (self-hosted). Live slides come from Sanity siteContent.
  images: [
    {
      src: "/carousel/retro-1.webp",
      alt: "Modern living room interior",
    },
    {
      src: "/carousel/retro-2.webp",
      alt: "Contemporary design space",
    },
    {
      src: "/carousel/retro-3.webp",
      alt: "Elegant bedroom design",
    },
    {
      src: "/carousel/retro-4.webp",
      alt: "Kitchen interior design",
    },
    {
      src: "/carousel/retro-5.webp",
      alt: "Luxury home exterior",
    },
    {
      src: "/carousel/retro-6.webp",
      alt: "Modern bathroom design",
    },
  ],
};

// ─── Projects (home section) ──────────────────────────────────────────────────

export const projectsSectionData: ProjectsSectionData = {
  eyebrow: "Selected Works",
  title: "Crafting Spaces",
  subtitle: "with Soul.",
  ctaLabel: "All Projects",
  ctaHref: "/projects",
  dragHint: "Drag to explore",
  // Fallback cards (self-hosted). Live projects come from Sanity.
  projects: [
    {
      id: 1,
      title: "Modern Residence",
      category: "Residential",
      year: "2024",
      image: "/carousel/retro-1.webp",
      link: "/projects/modern-residence",
    },
    {
      id: 2,
      title: "Green Living Space",
      category: "Sustainable",
      year: "2023",
      image: "/carousel/retro-2.webp",
      link: "/projects/green-living-space",
    },
    {
      id: 3,
      title: "Rustic Chalet",
      category: "Hospitality",
      year: "2024",
      image: "/carousel/retro-3.webp",
      link: "/projects/rustic-chalet",
    },
    {
      id: 4,
      title: "Urban Loft",
      category: "Renovation",
      year: "2022",
      image: "/carousel/retro-4.webp",
      link: "/projects/urban-loft",
    },
  ],
};

// ─── Projects (full /projects page) ──────────────────────────────────────────

export const projectsContentData: ProjectsContentData = {
  heading: "Selected Works",
  categories: [
    "All",
    "Residential",
    "Commercial",
    "Hospitality",
    "Sustainable",
    "Renovation",
  ],
  projects: [
    {
      id: 1,
      title: "Modern Residence",
      category: "Residential",
      year: "2024",
      location: "Bhopal, India",
      image: "/carousel/retro-1.webp",
      link: "/projects/modern-residence",
    },
    {
      id: 2,
      title: "Green Living Space",
      category: "Sustainable",
      year: "2023",
      location: "Indore, India",
      image: "/carousel/retro-2.webp",
      link: "/projects/green-living-space",
    },
    {
      id: 3,
      title: "Rustic Chalet",
      category: "Hospitality",
      year: "2024",
      location: "Manali, India",
      image: "/carousel/retro-3.webp",
      link: "/projects/rustic-chalet",
    },
    {
      id: 4,
      title: "Urban Loft",
      category: "Renovation",
      year: "2022",
      location: "Mumbai, India",
      image: "/carousel/retro-4.webp",
      link: "/projects/urban-loft",
    },
    {
      id: 5,
      title: "Corporate HQ",
      category: "Commercial",
      year: "2023",
      location: "Delhi, India",
      image: "/carousel/retro-5.webp",
      link: "/projects/corporate-hq",
    },
    {
      id: 6,
      title: "Lakeside Villa",
      category: "Residential",
      year: "2023",
      location: "Udaipur, India",
      image: "/carousel/retro-6.webp",
      link: "/projects/lakeside-villa",
    },
  ],
  emptyMessage: "No projects found in this category.",
};

// ─── Offers ───────────────────────────────────────────────────────────────────

export const offersSectionData: OffersSectionData = {
  eyebrow: "Our Offers",
  offers: [
    {
      title: "Limited-time offers",
      description:
        "We carry out turnkey decoration and interior architecture projects throughout India for your professional events, pop-ups, stands or showrooms.",
      link: "/offers/limited-time",
      ctaLabel: "View all offers",
    },
    {
      title: "Long-term offers",
      description:
        "We carry out turnkey interior design and architecture projects throughout India for your residences, coworking offices, commercial premises, restaurant, cafe, bar or hotel.",
      link: "/offers/long-term",
      ctaLabel: "View all offers",
    },
  ],
};

// ─── Pillars ──────────────────────────────────────────────────────────────────

export const pillarsSectionData: PillarsSectionData = {
  eyebrow: "Core Values",
  title: "Designed for",
  subtitle: "life.",
  backgroundText: "PHILOSOPHY",
  pillars: [
    {
      id: "01",
      title: "Eco-design",
      description:
        "We prioritize the use of sustainable, recycled, or responsibly sourced materials, collaborating as much as possible with local suppliers and artisans. This approach allows us to design environmentally friendly spaces while ensuring a refined and contemporary aesthetic.",
      link: "/eco-design",
    },
    {
      id: "02",
      title: "Our method",
      points: [
        {
          highlight: "Everything has its place.",
          text: "We optimize every corner, reveal the potential of the spaces, create invisible storage and fluid circulation. Nothing is left to chance.",
        },
        {
          highlight: "Each space breathes.",
          text: "No accumulation, no excess. Only the essentials: what serves you, what touches you, what reflects who you are.",
        },
        {
          highlight: "Every project takes time.",
          text: "Bio-sourced materials, refurbished second-hand furniture, local craftsmen: Because a beautiful space should never cost the environment dearly.",
        },
      ],
      link: "/our-method",
    },
    {
      id: "03",
      title: "Our convictions",
      description:
        'The future of housing lies not in "bigger", but in "better designed".',
      points: [
        { text: "Fewer square meters, more meaning." },
        { text: "Fewer possessions, more well-being." },
        { text: "Less waste, more intelligence." },
      ],
      outro:
        "AD.RS Design is the art of creating harmonious, sustainable and perfectly optimized living spaces where every square centimeter finds its purpose and where you find your balance.",
      link: "/our-convictions",
    },
  ],
};

// ─── Project CTA ──────────────────────────────────────────────────────────────

export const projectCTAData: ProjectCTAData = {
  headline: "Do you have a",
  subheadline: "project in mind?",
  description:
    "At AD.RS DESIGN, each project is conceived as a unique experience, at the crossroads of interior architecture and ephemeral scenography.",
  ctaLabel: "Get in touch",
  ctaHref: "/contact",
  footerLabel: "( Explore )",
};

// ─── Team ─────────────────────────────────────────────────────────────────────

export const teamSectionData: TeamSectionData = {
  eyebrow: "Our People",
  title: "Meet the",
  subtitle: "Visionaries.",
  description:
    "We are a constellation of thinkers and makers, united by a passion for spaces that resonate with the human spirit.",
  members: [
    {
      id: 1,
      name: "Elena Rodriguez",
      title: "Principal Architect",
      image: "/about-hero.png",
      bio: "Elena serves as the visionary force behind AD.RS Design. With over 15 years of experience in high-end residential and commercial architecture, she believes that spaces should allow life to unfold naturally. Her approach combines rigorous structural logic with a deep sensitivity to light and material.",
      gallery: ["/about-hero.png"],
      socials: [
        { name: "LinkedIn", url: "#" },
        { name: "Instagram", url: "#" },
        { name: "Email", url: "#" },
      ],
    },
    {
      id: 2,
      name: "Marcus Chen",
      title: "Lead Designer",
      image: "/about-hero.png",
      bio: "Marcus brings a sculptor's eye to interior spaces. A graduate of RISD, his philosophy centers on the dialogue between object and void. He specializes in bespoke furniture design and spatial planning, ensuring that every centimeter of a project serves both function and contemplation.",
      gallery: ["/about-hero.png"],
      socials: [
        { name: "LinkedIn", url: "#" },
        { name: "Behance", url: "#" },
        { name: "Email", url: "#" },
      ],
    },
    {
      id: 3,
      name: "Sophia Williams",
      title: "Interior Specialist",
      image: "/about-hero.png",
      bio: "Sophia is the master of atmosphere. With a background in textile design, she curates palettes that evoke warmth and serenity. She oversees the selection of fabrics, finishes, and fixtures, ensuring a cohesive tactile experience throughout every AD.RS project.",
      gallery: ["/about-hero.png"],
      socials: [
        { name: "LinkedIn", url: "#" },
        { name: "Instagram", url: "#" },
        { name: "Email", url: "#" },
      ],
    },
    {
      id: 4,
      name: "Daniel Foster",
      title: "Project Manager",
      image: "/about-hero.png",
      bio: "Daniel is the bridge between vision and reality. He ensures that complex designs are executed with precision, on time and on budget. His technical expertise and calm leadership style make him indispensable in navigating the complexities of construction and renovation.",
      gallery: ["/about-hero.png"],
      socials: [
        { name: "LinkedIn", url: "#" },
        { name: "Email", url: "#" },
      ],
    },
    {
      id: 5,
      name: "Amara Okonkwo",
      title: "Sustainability Lead",
      image: "/about-hero.png",
      bio: "Amara champions the ecological conscience of the studio. She researches and integrates bio-sourced materials and energy-efficient systems. Her goal is to prove that luxury and sustainability are not mutually exclusive, but rather synergistic.",
      gallery: ["/about-hero.png"],
      socials: [
        { name: "LinkedIn", url: "#" },
        { name: "Twitter", url: "#" },
        { name: "Email", url: "#" },
      ],
    },
    {
      id: 6,
      name: "Luca Moretti",
      title: "Technical Director",
      image: "/about-hero.png",
      bio: "Luca translates abstract concepts into buildable structures. With a background in structural engineering, he solves the most challenging design problems. He loves pushing the boundaries of what materials can do, exploring new joinery techniques and structural systems.",
      gallery: ["/about-hero.png"],
      socials: [
        { name: "LinkedIn", url: "#" },
        { name: "GitHub", url: "#" },
        { name: "Email", url: "#" },
      ],
    },
  ],
};

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const testimonialsSectionData: TestimonialsSectionData = {
  eyebrow: "Client Stories",
  title: "Words that",
  subtitle: "inspire us.",
  testimonials: [
    {
      id: 1,
      text: "Working with AD.RS was transformative. They didn't just design our home—they understood how we live, breathe, and dream. Every corner feels intentional, every detail speaks to us. It's not just a space; it's an extension of who we are.",
      author: "Priya & Arjun Malhotra",
      role: "Homeowners",
      project: "Modern Residence",
      rating: 5,
    },
    {
      id: 2,
      text: "The team at AD.RS brought our vision to life in ways we never imagined. Their attention to sustainability without compromising luxury was impressive. Our guests constantly ask who designed our space.",
      author: "Vikram Chandra",
      role: "CEO",
      project: "Corporate HQ",
      rating: 5,
    },
    {
      id: 3,
      text: "From the first consultation to the final reveal, AD.RS exceeded every expectation. They turned our dated loft into a sanctuary of light and space. Their ability to balance aesthetics with functionality is unmatched.",
      author: "Sarah Martinez",
      role: "Entrepreneur",
      project: "Urban Loft",
      rating: 5,
    },
    {
      id: 4,
      text: "The design philosophy at AD.RS is remarkable. They create spaces that feel timeless yet contemporary. Our villa is not just beautiful—it's a joy to live in every single day.",
      author: "Rajesh & Meera Sharma",
      role: "Business Owners",
      project: "Lakeside Villa",
      rating: 5,
    },
    {
      id: 5,
      text: "AD.RS transformed our boutique hotel into an unforgettable experience. Their attention to material quality and guest flow has significantly enhanced our brand. We've seen a remarkable increase in positive reviews.",
      author: "Kavita Desai",
      role: "Hospitality Director",
      project: "Rustic Chalet",
      rating: 5,
    },
    {
      id: 6,
      text: "The level of craftsmanship and thoughtfulness in every decision was extraordinary. AD.RS created a home that grows with us—functional today, adaptable for tomorrow. True design intelligence.",
      author: "Michael & Lisa Chen",
      role: "Family",
      project: "Green Living Space",
      rating: 5,
    },
  ],
};

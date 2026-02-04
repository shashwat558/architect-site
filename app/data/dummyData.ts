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

export const heroData: HeroData = {
  headline: "Crafting timeless spaces,",
  highlighted: "where architecture meets emotion.",
  description:
    "AD.RS Design Studio orchestrates unique spatial experiences. From sustainable foundations to ephemeral scenography, we design with precision for the essential.",
  images: [
    {
      src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
      alt: "Modern living room interior",
    },
    {
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      alt: "Contemporary design space",
    },
    {
      src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
      alt: "Elegant bedroom design",
    },
    {
      src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      alt: "Kitchen interior design",
    },
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      alt: "Luxury home exterior",
    },
    {
      src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      alt: "Modern bathroom design",
    },
  ],
};

export const projectsSectionData: ProjectsSectionData = {
  eyebrow: "Selected Works",
  title: "Crafting Spaces",
  subtitle: "with Soul.",
  ctaLabel: "All Projects",
  ctaHref: "/projects",
  dragHint: "Drag to explore",
  projects: [
    {
      id: 1,
      title: "Modern Residence",
      category: "Residential",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      link: "/projects/modern-residence",
    },
    {
      id: 2,
      title: "Green Living Space",
      category: "Sustainable",
      year: "2023",
      image:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      link: "/projects/green-living-space",
    },
    {
      id: 3,
      title: "Rustic Chalet",
      category: "Hospitality",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      link: "/projects/rustic-chalet",
    },
    {
      id: 4,
      title: "Urban Loft",
      category: "Renovation",
      year: "2022",
      image:
        "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80",
      link: "/projects/urban-loft",
    },
  ],
};

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
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      link: "/projects/modern-residence",
    },
    {
      id: 2,
      title: "Green Living Space",
      category: "Sustainable",
      year: "2023",
      location: "Indore, India",
      image:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      link: "/projects/green-living-space",
    },
    {
      id: 3,
      title: "Rustic Chalet",
      category: "Hospitality",
      year: "2024",
      location: "Manali, India",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      link: "/projects/rustic-chalet",
    },
    {
      id: 4,
      title: "Urban Loft",
      category: "Renovation",
      year: "2022",
      location: "Mumbai, India",
      image:
        "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80",
      link: "/projects/urban-loft",
    },
    {
      id: 5,
      title: "Corporate HQ",
      category: "Commercial",
      year: "2023",
      location: "Delhi, India",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      link: "/projects/corporate-hq",
    },
    {
      id: 6,
      title: "Lakeside Villa",
      category: "Residential",
      year: "2023",
      location: "Udaipur, India",
      image:
        "https://images.unsplash.com/photo-1600596542815-bfad4c1539a9?w=1200&q=80",
      link: "/projects/lakeside-villa",
    },
  ],
  emptyMessage: "No projects found in this category.",
};

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
        "The future of housing lies not in \"bigger\", but in \"better designed\".",
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

export const projectCTAData: ProjectCTAData = {
  headline: "Do you have a",
  subheadline: "project in mind?",
  description:
    "At AD.RS DESIGN, each project is conceived as a unique experience, at the crossroads of interior architecture and ephemeral scenography.",
  ctaLabel: "Get in touch",
  ctaHref: "/contact",
  footerLabel: "( Explore )",
};

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
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop",
      bio: "Elena serves as the visionary force behind AD.RS Design. With over 15 years of experience in high-end residential and commercial architecture, she believes that spaces should allow life to unfold naturally. Her approach combines rigorous structural logic with a deep sensitivity to light and material.",
      gallery: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
      ],
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
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=1000&fit=crop",
      bio: "Marcus brings a sculptor's eye to interior spaces. A graduate of RISD, his philosophy centers on the dialogue between object and void. He specializes in bespoke furniture design and spatial planning, ensuring that every centimeter of a project serves both function and contemplation.",
      gallery: [
        "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1200&q=80",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfe1?w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      ],
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
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=1000&fit=crop",
      bio: "Sophia is the master of atmosphere. With a background in textile design, she curates palettes that evoke warmth and serenity. She oversees the selection of fabrics, finishes, and fixtures, ensuring a cohesive tactile experience throughout every AD.RS project.",
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80",
      ],
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
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=1000&fit=crop",
      bio: "Daniel is the bridge between vision and reality. He ensures that complex designs are executed with precision, on time and on budget. His technical expertise and calm leadership style make him indispensable in navigating the complexities of construction and renovation.",
      gallery: [
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfe1?w=1200&q=80",
      ],
      socials: [
        { name: "LinkedIn", url: "#" },
        { name: "Email", url: "#" },
      ],
    },
    {
      id: 5,
      name: "Amara Okonkwo",
      title: "Sustainability Lead",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&h=1000&fit=crop",
      bio: "Amara champions the ecological conscience of the studio. She researches and integrates bio-sourced materials and energy-efficient systems. Her goal is to prove that luxury and sustainability are not mutually exclusive, but rather synergistic.",
      gallery: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
        "https://images.unsplash.com/photo-1518005052304-a32d18df52fa?w=1200&q=80",
      ],
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
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop",
      bio: "Luca translates abstract concepts into buildable structures. With a background in structural engineering, he solves the most challenging design problems. He loves pushing the boundaries of what materials can do, exploring new joinery techniques and structural systems.",
      gallery: [
        "https://images.unsplash.com/photo-1594498653385-d51755754540?w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
      ],
      socials: [
        { name: "LinkedIn", url: "#" },
        { name: "GitHub", url: "#" },
        { name: "Email", url: "#" },
      ],
    },
  ],
};

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
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      rating: 5,
    },
    {
      id: 2,
      text: "The team at AD.RS brought our vision to life in ways we never imagined. Their attention to sustainability without compromising luxury was impressive. Our guests constantly ask who designed our space.",
      author: "Vikram Chandra",
      role: "CEO",
      project: "Corporate HQ",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      rating: 5,
    },
    {
      id: 3,
      text: "From the first consultation to the final reveal, AD.RS exceeded every expectation. They turned our dated loft into a sanctuary of light and space. Their ability to balance aesthetics with functionality is unmatched.",
      author: "Sarah Martinez",
      role: "Entrepreneur",
      project: "Urban Loft",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      rating: 5,
    },
    {
      id: 4,
      text: "The design philosophy at AD.RS is remarkable. They create spaces that feel timeless yet contemporary. Our villa is not just beautiful—it's a joy to live in every single day.",
      author: "Rajesh & Meera Sharma",
      role: "Business Owners",
      project: "Lakeside Villa",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      rating: 5,
    },
    {
      id: 5,
      text: "AD.RS transformed our boutique hotel into an unforgettable experience. Their attention to material quality and guest flow has significantly enhanced our brand. We've seen a remarkable increase in positive reviews.",
      author: "Kavita Desai",
      role: "Hospitality Director",
      project: "Rustic Chalet",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
      rating: 5,
    },
    {
      id: 6,
      text: "The level of craftsmanship and thoughtfulness in every decision was extraordinary. AD.RS created a home that grows with us—functional today, adaptable for tomorrow. True design intelligence.",
      author: "Michael & Lisa Chen",
      role: "Family",
      project: "Green Living Space",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      rating: 5,
    },
  ],
};

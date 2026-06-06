export type ProjectMetaItem = {
  label: string;
  value: string;
};

export type ProjectData = {
  title: string;
  subtitle: string;
  slug: string;
  heroImage: string;
  meta: ProjectMetaItem[];
  brief: string;
  approach: string;
  gallery: { src: string; width: string; aspectRatio: string; type: string }[];
  processGallery: { src: string; width: string; aspectRatio: string; type: string; label: string }[];
  nextProject: { name: string; slug: string; image: string };
  materials: { name: string; origin: string; texture: string }[];
  testimonial: { text: string; author: string; role: string };
  team: { role: string; name: string }[];
};

const projectDataList: ProjectData[] = [
  {
    title: "Modern Residence",
    subtitle: "A Brutalist Sanctuary",
    slug: "modern-residence",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    meta: [
      { label: "Location", value: "Bhopal, India" },
      { label: "Client", value: "Private Family" },
      { label: "Year", value: "2024" },
      { label: "Area", value: "4,500 sq.ft" },
      { label: "Scope", value: "Architecture & Interior" },
    ],
    brief:
      "The client desired a home that felt like a quiet retreat from the city's chaos. They requested openness without sacrificing privacy, and a material palette that would age gracefully. The site was narrow and hemmed in by taller structures.",
    approach:
      "Our strategy was subtractive. We carved courtyards and light wells from a solid volume to bring light deep into the floor plate. By inverting the focus, we created a private oasis that turns its back on the noise outside.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1200&q=80",
        width: "col-span-12 md:col-span-8",
        aspectRatio: "aspect-[16/10]",
        type: "photo",
      },
      {
        src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
        width: "col-span-12 md:col-span-4",
        aspectRatio: "aspect-[3/4]",
        type: "photo",
      },
      {
        src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
        width: "col-span-12 md:col-span-4",
        aspectRatio: "aspect-[3/4]",
        type: "photo",
      },
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        width: "col-span-12 md:col-span-8",
        aspectRatio: "aspect-[16/10]",
        type: "photo",
      },
    ],
    processGallery: [
      {
        src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80",
        width: "col-span-12 md:col-span-6",
        aspectRatio: "aspect-[4/3]",
        type: "sketch",
        label: "Initial Massing Study",
      },
      {
        src: "https://images.unsplash.com/photo-1628151016027-2c97dc53696e?w=800&q=80",
        width: "col-span-12 md:col-span-6",
        aspectRatio: "aspect-[4/3]",
        type: "sketch",
        label: "Circulation Diagram",
      },
      {
        src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
        width: "col-span-12",
        aspectRatio: "aspect-[21/9]",
        type: "sketch",
        label: "Sectional Perspective",
      },
      {
        src: "https://images.unsplash.com/photo-1621252179027-94459d27d3ee?w=800&q=80",
        width: "col-span-12 md:col-span-4",
        aspectRatio: "aspect-[3/4]",
        type: "sketch",
        label: "Light Study",
      },
      {
        src: "https://images.unsplash.com/photo-1563853153547-2c7760812739?w=800&q=80",
        width: "col-span-12 md:col-span-8",
        aspectRatio: "aspect-[16/10]",
        type: "sketch",
        label: "Facade Detail Sketch",
      },
    ],
    nextProject: {
      name: "Green Living",
      slug: "green-living",
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
    },
    materials: [
      {
        name: "Travertine",
        origin: "Italy",
        texture: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&q=80",
      },
      {
        name: "Teak Wood",
        origin: "Burma",
        texture: "https://images.unsplash.com/photo-1549405452-19830588691b?w=400&q=80",
      },
      {
        name: "Brushed Brass",
        origin: "Local",
        texture: "https://images.unsplash.com/photo-1616423664074-907f813a0dbb?w=400&q=80",
      },
      {
        name: "Rough Concrete",
        origin: "In-situ",
        texture: "https://images.unsplash.com/photo-1517646331032-9e85639f0b5d?w=400&q=80",
      },
    ],
    testimonial: {
      text: "Living here feels like inhabiting a piece of art that breathes. AD.RS transformed a difficult site into a sanctuary.",
      author: "Rahul & Meera Sharma",
      role: "Homeowners",
    },
    team: [
      { role: "Principal Architect", name: "Elena Rodriguez" },
      { role: "Interior Lead", name: "Sophia Williams" },
      { role: "Structure", name: "BuildTech Consultants" },
      { role: "Lighting", name: "Lumina Studio" },
    ],
  },
];

export const defaultProject = projectDataList[0];

export const getProjectBySlug = (slug?: string) => {
  if (!slug) return defaultProject;
  return projectDataList.find((project) => project.slug === slug) || defaultProject;
};

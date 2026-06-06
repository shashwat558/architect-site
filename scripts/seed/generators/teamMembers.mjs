/**
 * Team Member seed data for AD.RS Design Studio.
 * All IDs are deterministic so the script is idempotent.
 *
 * @param {Function} resolveImage - async (url, label, alt) => Sanity image field object
 */

/** Minimal portable-text block builder */
function block(text) {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 10), text, marks: [] }],
  };
}

/** Unsplash portrait images (architecture/design professional tone) */
const portraits = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1548142813-c348350df52b?w=800&h=1000&fit=crop',
];

const members = [
  {
    id: 'demo-tm-01',
    name: 'Aditi Rawat',
    slug: 'aditi-rawat',
    role: 'Founder & Principal Architect',
    bio: `Aditi founded AD.RS Design Studio in 2009 after a decade of practice at OMA Rotterdam and Snøhetta Oslo. Her design philosophy centers on the interplay of silence, light, and material honesty. She holds a Masters in Advanced Architecture from the Architectural Association in London and has been recognized by the Aga Khan Award for Architecture.`,
    order: 1,
    linkedin: 'https://linkedin.com/in/aditi-rawat',
    instagram: 'https://instagram.com/aditi.rawat.arch',
    portraitIdx: 0,
  },
  {
    id: 'demo-tm-02',
    name: 'Rohan Sharma',
    slug: 'rohan-sharma',
    role: 'Associate Partner – Residential',
    bio: `Rohan leads the residential portfolio, bringing a sculptor's eye to spatial composition. A graduate of CEPT Ahmedabad and IIT Roorkee, he focuses on bespoke furniture integration and vernacular material expression. His work has been featured in Architectural Digest India and Wallpaper* magazine.`,
    order: 2,
    linkedin: 'https://linkedin.com/in/rohan-sharma-arch',
    instagram: 'https://instagram.com/rohan.design',
    portraitIdx: 1,
  },
  {
    id: 'demo-tm-03',
    name: 'Meera Iyer',
    slug: 'meera-iyer',
    role: 'Interior Specialist & Materiality Lead',
    bio: `Meera is the studio's atmosphere curator. With a background in textile design from NID Ahmedabad, she oversees the selection of fabrics, stone, and finishes for every project. She believes that touch is the most underrated sense in architecture and brings that conviction to every material decision.`,
    order: 3,
    linkedin: 'https://linkedin.com/in/meera-iyer-design',
    instagram: 'https://instagram.com/meera.materiality',
    portraitIdx: 2,
  },
  {
    id: 'demo-tm-04',
    name: 'Vikram Joshi',
    slug: 'vikram-joshi',
    role: 'Technical Director & Project Manager',
    bio: `Vikram is the bridge between poetic vision and precise execution. With a background in structural engineering from IIT Bombay, he ensures every complex design translates flawlessly to construction. His methodical leadership has delivered 40+ projects on time and on budget over 12 years.`,
    order: 4,
    linkedin: 'https://linkedin.com/in/vikram-joshi',
    instagram: 'https://instagram.com/vikram.builds',
    portraitIdx: 3,
  },
  {
    id: 'demo-tm-05',
    name: 'Kavya Menon',
    slug: 'kavya-menon',
    role: 'Sustainability & Eco-Design Lead',
    bio: `Kavya champions the ecological conscience of AD.RS. She researches and integrates bio-sourced materials, passive cooling systems, and biophilic design strategies. A certified IGBC Green Building Professional, she believes that luxury and sustainability are not competing forces but natural complements.`,
    order: 5,
    linkedin: 'https://linkedin.com/in/kavya-menon-sustainability',
    instagram: 'https://instagram.com/kavya.ecodesign',
    portraitIdx: 4,
  },
  {
    id: 'demo-tm-06',
    name: 'Arjun Desai',
    slug: 'arjun-desai',
    role: 'Senior Architect – Commercial & Hospitality',
    bio: `Arjun leads all commercial and hospitality commissions at AD.RS. After completing his studies at KRVIA Mumbai, he worked with Studio Mumbai and Heatherwick Studio. He excels at creating experiential environments—spaces that function flawlessly while leaving a lasting emotional impression.`,
    order: 6,
    linkedin: 'https://linkedin.com/in/arjun-desai-arch',
    instagram: 'https://instagram.com/arjun.spaces',
    portraitIdx: 5,
  },
  {
    id: 'demo-tm-07',
    name: 'Priya Nair',
    slug: 'priya-nair',
    role: 'Landscape & Urban Design Consultant',
    bio: `Priya brings a landscape architect's perspective to every project, ensuring the built environment integrates thoughtfully with its natural context. Her background spans urban public realm design with the Bhopal Municipal Corporation and private landscape commissions across Rajasthan and Goa.`,
    order: 7,
    linkedin: 'https://linkedin.com/in/priya-nair-landscape',
    instagram: 'https://instagram.com/priya.landscape',
    portraitIdx: 6,
  },
  {
    id: 'demo-tm-08',
    name: 'Siddharth Kulkarni',
    slug: 'siddharth-kulkarni',
    role: 'Computational Design & Visualisation Lead',
    bio: `Siddharth leads all digital fabrication and parametric design explorations at AD.RS. He is fluent in Rhino, Grasshopper, and Revit, and uses computation not as a stylistic gimmick but as a tool to solve genuine spatial problems. He holds a Masters in Computational Design from TU Delft.`,
    order: 8,
    linkedin: 'https://linkedin.com/in/siddharth-kulkarni-cd',
    instagram: 'https://instagram.com/siddharth.computational',
    portraitIdx: 7,
  },
  {
    id: 'demo-tm-09',
    name: 'Tanvi Shah',
    slug: 'tanvi-shah',
    role: 'Client Relations & Studio Director',
    bio: `Tanvi is the connective tissue between the studio's creative vision and its clients' lived dreams. She manages the entire client journey from first consultation through post-occupancy follow-ups. Her empathetic communication style has been instrumental in AD.RS's 98% client satisfaction rating.`,
    order: 9,
    linkedin: 'https://linkedin.com/in/tanvi-shah-studio',
    instagram: 'https://instagram.com/tanvi.studiolife',
    portraitIdx: 8,
  },
  {
    id: 'demo-tm-10',
    name: 'Karan Mehta',
    slug: 'karan-mehta',
    role: 'Junior Architect & Site Coordinator',
    bio: `Karan is a recent graduate of SPA Delhi who joined AD.RS after winning the Charles Correa Foundation Travel Grant. He coordinates site visits, contractor communications, and quality inspections across active projects. He is passionate about adaptive reuse and post-colonial Indian architecture.`,
    order: 10,
    linkedin: 'https://linkedin.com/in/karan-mehta-arch',
    instagram: 'https://instagram.com/karan.sites',
    portraitIdx: 9,
  },
];

export async function getTeamMemberSeeds(resolveImage) {
  const seeds = [];
  for (const m of members) {
    const image = await resolveImage(
      portraits[m.portraitIdx],
      `portrait-${m.id}`,
      `${m.name} — ${m.role} at AD.RS Design Studio`
    );
    seeds.push({
      _id: m.id,
      name: m.name,
      slug: { _type: 'slug', current: m.slug },
      role: m.role,
      image,
      bio: [block(m.bio)],
      socialLinks: [
        { _key: `sl-li-${m.id}`, _type: 'object', platform: 'linkedin', url: m.linkedin },
        { _key: `sl-ig-${m.id}`, _type: 'object', platform: 'instagram', url: m.instagram },
      ],
      displayOrder: m.order,
    });
  }
  return seeds;
}

/** Testimonials seed generator for AD.RS Design Studio (mirrors app/data/content.ts) */

const testimonials = [
  {
    text: "Working with AD.RS was transformative. They didn't just design our home—they understood how we live, breathe, and dream. Every corner feels intentional, every detail speaks to us. It's not just a space; it's an extension of who we are.",
    author: 'Priya & Arjun Malhotra', role: 'Homeowners', project: 'Modern Residence', rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
  {
    text: "The team at AD.RS brought our vision to life in ways we never imagined. Their attention to sustainability without compromising luxury was impressive. Our guests constantly ask who designed our space.",
    author: 'Vikram Chandra', role: 'CEO', project: 'Corporate HQ', rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  },
  {
    text: "From the first consultation to the final reveal, AD.RS exceeded every expectation. They turned our dated loft into a sanctuary of light and space. Their ability to balance aesthetics with functionality is unmatched.",
    author: 'Sarah Martinez', role: 'Entrepreneur', project: 'Urban Loft', rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
  },
  {
    text: "The design philosophy at AD.RS is remarkable. They create spaces that feel timeless yet contemporary. Our villa is not just beautiful—it's a joy to live in every single day.",
    author: 'Rajesh & Meera Sharma', role: 'Business Owners', project: 'Lakeside Villa', rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    text: "AD.RS transformed our boutique hotel into an unforgettable experience. Their attention to material quality and guest flow has significantly enhanced our brand. We've seen a remarkable increase in positive reviews.",
    author: 'Kavita Desai', role: 'Hospitality Director', project: 'Rustic Chalet', rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
  },
  {
    text: "The level of craftsmanship and thoughtfulness in every decision was extraordinary. AD.RS created a home that grows with us—functional today, adaptable for tomorrow. True design intelligence.",
    author: 'Michael & Lisa Chen', role: 'Family', project: 'Green Living Space', rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
  },
];

/**
 * @param {Function} resolveImage - async (url, label, alt) => Sanity image asset object
 */
export async function getTestimonialSeeds(resolveImage) {
  const seeds = [];

  for (const [i, t] of testimonials.entries()) {
    const avatar = await resolveImage(t.avatarUrl, `avatar-${i + 1}`, `${t.author} portrait`);
    seeds.push({
      _id: `demo-tmnl-${String(i + 1).padStart(2, '0')}`,
      text: t.text,
      author: t.author,
      role: t.role,
      project: t.project,
      avatar,
      rating: t.rating,
      displayOrder: i,
    });
  }

  return seeds;
}

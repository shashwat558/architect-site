/** Site Content singleton seed for AD.RS Design Studio (mirrors app/data/content.ts) */

import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
// generators/ -> seed/ -> scripts/ -> repo root
const repoRoot = join(here, '..', '..', '..');

const heroSlides = [
  { file: 'public/carousel/retro-1.webp', caption: 'Urban Geometry', alt: 'Urban geometry architecture' },
  { file: 'public/carousel/retro-2.webp', caption: 'Light & Space', alt: 'Light and space interior' },
  { file: 'public/carousel/retro-3.webp', caption: 'Brutalist Form', alt: 'Brutalist architectural form' },
  { file: 'public/carousel/retro-4.webp', caption: 'Sunset Retreat', alt: 'Sunset retreat exterior' },
  { file: 'public/carousel/retro-5.webp', caption: 'Zen Courtyard', alt: 'Zen courtyard' },
  { file: 'public/carousel/retro-6.webp', caption: 'Curved Museum', alt: 'Curved museum building' },
];

/**
 * @param {Function} resolveImage - async (url, label, alt) => Sanity image asset object (URL-based)
 * @param {Function} resolveLocalImage - async (absPath, filename, alt) => Sanity image asset object (local file)
 */
export async function getSiteContentSeed(resolveImage, resolveLocalImage) {
  void resolveImage;

  const slides = [];
  for (const [i, s] of heroSlides.entries()) {
    const abs = join(repoRoot, s.file);
    if (!existsSync(abs)) throw new Error(`Missing hero slide file: ${s.file}`);
    const image = await resolveLocalImage(abs, `hero-slide-${i + 1}.webp`, s.alt);
    slides.push({
      _type: 'object',
      _key: `slide-${i + 1}`,
      image,
      caption: s.caption,
    });
  }

  return [
    {
      _id: 'siteContent',
      testimonialsHeader: {
        _type: 'object',
        eyebrow: 'Client Stories',
        title: 'Words that',
        subtitle: 'inspire us.',
      },
      pillarsHeader: {
        _type: 'object',
        eyebrow: 'Core Values',
        title: 'Designed for',
        subtitle: 'life.',
        backgroundText: 'PHILOSOPHY',
      },
      pillars: [
        {
          _type: 'object',
          _key: 'pillar-1',
          pid: '01',
          title: 'Eco-design',
          description:
            'We prioritize the use of sustainable, recycled, or responsibly sourced materials, collaborating as much as possible with local suppliers and artisans. This approach allows us to design environmentally friendly spaces while ensuring a refined and contemporary aesthetic.',
          link: '/eco-design',
        },
        {
          _type: 'object',
          _key: 'pillar-2',
          pid: '02',
          title: 'Our method',
          points: [
            { _type: 'object', _key: 'p2-1', highlight: 'Everything has its place.', text: 'We optimize every corner, reveal the potential of the spaces, create invisible storage and fluid circulation. Nothing is left to chance.' },
            { _type: 'object', _key: 'p2-2', highlight: 'Each space breathes.', text: 'No accumulation, no excess. Only the essentials: what serves you, what touches you, what reflects who you are.' },
            { _type: 'object', _key: 'p2-3', highlight: 'Every project takes time.', text: 'Bio-sourced materials, refurbished second-hand furniture, local craftsmen: Because a beautiful space should never cost the environment dearly.' },
          ],
          link: '/our-method',
        },
        {
          _type: 'object',
          _key: 'pillar-3',
          pid: '03',
          title: 'Our convictions',
          description: 'The future of housing lies not in "bigger", but in "better designed".',
          points: [
            { _type: 'object', _key: 'p3-1', text: 'Fewer square meters, more meaning.' },
            { _type: 'object', _key: 'p3-2', text: 'Fewer possessions, more well-being.' },
            { _type: 'object', _key: 'p3-3', text: 'Less waste, more intelligence.' },
          ],
          outro:
            'AD.RS Design is the art of creating harmonious, sustainable and perfectly optimized living spaces where every square centimeter finds its purpose and where you find your balance.',
          link: '/our-convictions',
        },
      ],
      offersHeader: { _type: 'object', eyebrow: 'Our Offers' },
      offers: [
        {
          _type: 'object',
          _key: 'offer-1',
          title: 'Limited-time offers',
          description:
            'We carry out turnkey decoration and interior architecture projects throughout India for your professional events, pop-ups, stands or showrooms.',
          link: '/offers/limited-time',
          ctaLabel: 'View all offers',
        },
        {
          _type: 'object',
          _key: 'offer-2',
          title: 'Long-term offers',
          description:
            'We carry out turnkey interior design and architecture projects throughout India for your residences, coworking offices, commercial premises, restaurant, cafe, bar or hotel.',
          link: '/offers/long-term',
          ctaLabel: 'View all offers',
        },
      ],
      heroSlides: slides,
    },
  ];
}

// Source files uploaded for the hero slides (local repo assets).
export const siteContentSourceFiles = heroSlides.map((s) => s.file);

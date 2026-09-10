import { defineArrayMember, defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

/**
 * Site Content singleton — homepage sections the editors own:
 * hero carousel slides, pillars (philosophy), offers and section headers.
 * Document ID is fixed to `siteContent` (see structure.ts).
 */
export const siteContentType = defineType({
  name: 'siteContent',
  title: 'Site Content',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    // ── Hero carousel slides ──────────────────────────────────────────────
    defineField({
      name: 'heroSlides',
      title: 'Hero Carousel Slides',
      type: 'array',
      description: 'Retro photo strip on the homepage hero.',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Slide',
          fields: [
            defineField({
              name: 'image',
              title: 'Slide Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({ name: 'alt', title: 'Alternative Text', type: 'string' }),
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'e.g. "Urban Geometry".',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'caption', media: 'image' },
          },
        }),
      ],
    }),

    // ── Testimonials header ───────────────────────────────────────────────
    defineField({
      name: 'testimonialsHeader',
      title: 'Testimonials Section Header',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
      ],
    }),

    // ── Pillars ───────────────────────────────────────────────────────────
    defineField({
      name: 'pillarsHeader',
      title: 'Pillars Section Header',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Subtitle (italic accent)', type: 'string' }),
        defineField({ name: 'backgroundText', title: 'Background Watermark Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'pillars',
      title: 'Pillars',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Pillar',
          fields: [
            defineField({ name: 'pid', title: 'Index Label', type: 'string', description: 'e.g. "01".' }),
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
            defineField({
              name: 'points',
              title: 'Bullet Points',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  title: 'Point',
                  fields: [
                    defineField({ name: 'highlight', title: 'Highlight (bold lead)', type: 'string' }),
                    defineField({ name: 'text', title: 'Text', type: 'string', validation: (Rule) => Rule.required() }),
                  ],
                }),
              ],
            }),
            defineField({ name: 'outro', title: 'Outro Quote', type: 'text', rows: 2 }),
            defineField({ name: 'link', title: 'Read-more Link', type: 'string', initialValue: '/process' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'pid' },
          },
        }),
      ],
    }),

    // ── Offers ────────────────────────────────────────────────────────────
    defineField({
      name: 'offersHeader',
      title: 'Offers Section Header',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
      ],
    }),
    defineField({
      name: 'offers',
      title: 'Offers',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Offer',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({ name: 'link', title: 'Link', type: 'string' }),
            defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
          ],
          preview: {
            select: { title: 'title' },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Content',
        subtitle: 'Homepage sections',
      }
    },
  },
})

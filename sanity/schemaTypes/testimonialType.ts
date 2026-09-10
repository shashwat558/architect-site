import { defineField, defineType } from 'sanity'
import { CommentIcon } from '@sanity/icons'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Testimonial Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().error('Testimonial text is required.'),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('Author name is required.'),
    }),
    defineField({
      name: 'role',
      title: 'Author Role',
      type: 'string',
      description: 'e.g. "Homeowners", "CEO", "Hospitality Director".',
    }),
    defineField({
      name: 'project',
      title: 'Related Project',
      type: 'string',
      description: 'Project name this testimonial refers to (e.g. "Modern Residence").',
    }),
    defineField({
      name: 'avatar',
      title: 'Author Avatar',
      type: 'image',
      description: 'Small portrait photo. Hotspot enabled.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1–5)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'role',
      media: 'avatar',
    },
  },
})

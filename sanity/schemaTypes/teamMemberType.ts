import { defineArrayMember, defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).error('Name is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used for individual bio pages, if applicable.',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required.'),
    }),
    defineField({
      name: 'role',
      title: 'Role / Designation',
      type: 'string',
      description: 'e.g., "Founder & Principal Architect", "Associate Partner", "Senior Designer".',
      validation: (Rule) => Rule.required().error('Role is required.'),
    }),
    defineField({
      name: 'image',
      title: 'Profile Photo',
      type: 'image',
      description: 'Professional headshot. Enable hotspot for precise cropping.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: (Rule) => Rule.required().warning('Alt text is recommended for accessibility.'),
        }),
      ],
      validation: (Rule) => Rule.required().error('Profile picture is required.'),
    }),
    defineField({
      name: 'bio',
      title: 'Short Biography',
      type: 'array',
      description: 'A brief introduction about the member, their professional background, and design philosophy.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Profiles',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Social Link',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Twitter / X', value: 'twitter' },
                  { title: 'Portfolio Website', value: 'portfolio' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['http', 'https'],
                }),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Used to sort team members on the about page (e.g. 1 for leadership, 2, 3, etc.). Lower numbers appear first.',
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})

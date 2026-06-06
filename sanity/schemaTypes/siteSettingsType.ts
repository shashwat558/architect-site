import { defineArrayMember, defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'The name of the architecture studio (e.g. "Studio Antigravity").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'The primary brand logo.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          initialValue: 'Studio Logo',
        }),
      ],
    }),
    defineField({
      name: 'homeHero',
      title: 'Homepage Hero Section',
      type: 'object',
      description: 'Configure the large hero introduction on the homepage.',
      fields: [
        defineField({
          name: 'title',
          title: 'Hero Heading',
          type: 'string',
          description: 'The primary bold statement (e.g. "Crafting Timeless Architectural Masterpieces").',
        }),
        defineField({
          name: 'subtitle',
          title: 'Hero Subheading / Statement',
          type: 'text',
          rows: 3,
          description: 'A detailed secondary statement or tagline.',
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Hero Background Image',
          type: 'image',
          description: 'Large cover image or render for the background. Hotspot enabled.',
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
        }),
        defineField({
          name: 'ctaText',
          title: 'Call to Action Button Text',
          type: 'string',
          description: 'Text for the main action button (e.g. "View Our Projects").',
        }),
        defineField({
          name: 'ctaLink',
          title: 'Call to Action Link',
          type: 'string',
          description: 'Relative path or absolute URL (e.g. "/projects").',
        }),
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      description: 'Global contact details, usually displayed in the footer or contact page.',
      fields: [
        defineField({
          name: 'email',
          title: 'Email Address',
          type: 'string',
          validation: (Rule) => Rule.email(),
        }),
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        }),
        defineField({
          name: 'address',
          title: 'Office Address',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'officeHours',
          title: 'Office Hours',
          type: 'string',
          description: 'e.g. "Mon - Fri: 9:00 AM - 6:00 PM"',
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Studio Social Links',
      type: 'array',
      description: 'Social handles linked across the website headers or footers.',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Social Profile',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Pinterest', value: 'pinterest' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'YouTube', value: 'youtube' },
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
      name: 'globalSeo',
      title: 'Global SEO Settings',
      type: 'seo',
      description: 'Fallback search engine settings if page-specific SEO is not defined.',
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
    },
    prepare({ title }) {
      return {
        title: title || 'Global Settings',
        subtitle: 'Site Configurations',
      }
    },
  },
})

import { defineField, defineType } from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO & Social Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Meta Title',
      type: 'string',
      description: 'The title displayed in search engine results and browser tabs. Recommended length: 50-60 characters.',
      validation: (Rule) => Rule.max(70).warning('Titles longer than 70 characters might get truncated in search results.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'A brief summary of the page content. Recommended length: 120-160 characters.',
      validation: (Rule) => Rule.max(200).warning('Descriptions longer than 160 characters might get truncated.'),
    }),
    defineField({
      name: 'image',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image displayed when this page is shared on social media (Facebook, Twitter, LinkedIn, etc.). Recommended size: 1200x630px.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Relevant search terms for this content.',
      options: {
        layout: 'tags',
      },
    }),
  ],
})

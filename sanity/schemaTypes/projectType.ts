import { defineArrayMember, defineField, defineType } from 'sanity'
import { CaseIcon } from '@sanity/icons'

export const projectType = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  icon: CaseIcon,
  fields: [
    // --- Basic Information ---
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'The name of the architectural project (e.g. "Modern Residence").',
      validation: (Rule) => Rule.required().min(3).error('Project title is required.'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Project Subtitle / Tagline',
      type: 'string',
      description: 'A short description or design concept (e.g. "A Brutalist Sanctuary").',
      validation: (Rule) => Rule.required().error('Subtitle is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL path segment for this project. Generated from the title.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required for the project URL.'),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Showcase this project on the homepage or featured section.',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Type of architectural project.',
      options: {
        list: [
          { title: 'Residential', value: 'Residential' },
          { title: 'Commercial', value: 'Commercial' },
          { title: 'Hospitality', value: 'Hospitality' },
          { title: 'Sustainable', value: 'Sustainable' },
          { title: 'Renovation', value: 'Renovation' },
          { title: 'Interior Design', value: 'Interior Design' },
          { title: 'Landscape', value: 'Landscape' },
          { title: 'Urban Planning', value: 'Urban Planning' },
        ],
      },
      validation: (Rule) => Rule.required().error('Category is required.'),
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          { title: 'Concept', value: 'concept' },
          { title: 'Under Construction', value: 'under-construction' },
          { title: 'Completed', value: 'completed' },
          { title: 'Proposal', value: 'proposal' },
        ],
        layout: 'radio',
      },
      initialValue: 'completed',
      validation: (Rule) => Rule.required(),
    }),

    // --- Hero Cover Image ---
    defineField({
      name: 'heroImage',
      title: 'Hero Cover Image',
      type: 'image',
      description: 'The main widescreen cover photo for the project. Enable hotspot for custom crops.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: (Rule) => Rule.required().warning('Alt text is highly recommended for accessibility.'),
        }),
      ],
      validation: (Rule) => Rule.required().error('Hero cover image is required.'),
    }),

    // --- Metadata Parameters (flexible key-value table) ---
    defineField({
      name: 'meta',
      title: 'Project Metadata (Meta Block)',
      type: 'array',
      description: 'Key-value details rendered in the meta summary block (e.g. Location, Client, Year, Area, Scope).',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Metadata Item',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g., "Location", "Client", "Year", "Area"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g., "Bhopal, India", "Private Family", "2024", "4,500 sq.ft"',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1).error('Provide at least one metadata item.'),
    }),

    // --- The Narrative (Brief, Approach, Challenges) ---
    defineField({
      name: 'brief',
      title: 'Project Brief',
      type: 'text',
      rows: 4,
      description: 'Large intro brief text (e.g. "The client desired a home that felt like a quiet retreat...").',
      validation: (Rule) => Rule.required().error('Brief is required.'),
    }),
    defineField({
      name: 'approach',
      title: 'Our Design Approach',
      type: 'text',
      rows: 6,
      description: 'Secondary detailed explanation of the design approach, structure, and materials.',
      validation: (Rule) => Rule.required().error('Design approach explanation is required.'),
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      rows: 3,
      description: 'e.g. "Narrow site constraints and limited natural light access from neighboring structures."',
    }),
    defineField({
      name: 'solution',
      title: 'The Solution',
      type: 'text',
      rows: 3,
      description: 'e.g. "Inward-looking courtyard typology focusing on vertical light penetration."',
    }),

    // --- Before/After Transformation Section ---
    defineField({
      name: 'transformation',
      title: 'Before/After Transformation',
      type: 'object',
      description: 'Optional transformation slider showcase.',
      fields: [
        defineField({
          name: 'isEnabled',
          title: 'Enable Transformation Section',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'From Ruins to Sanctuary',
          hidden: ({ parent }) => !parent?.isEnabled,
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 3,
          initialValue: 'See how we stripped back the layers to reveal the potential underneath...',
          hidden: ({ parent }) => !parent?.isEnabled,
        }),
        defineField({
          name: 'quote',
          title: 'Featured Quote',
          type: 'string',
          initialValue: 'The most sustainable building is the one that already exists.',
          hidden: ({ parent }) => !parent?.isEnabled,
        }),
        defineField({
          name: 'slides',
          title: 'Before/After Comparison Slides',
          type: 'array',
          hidden: ({ parent }) => !parent?.isEnabled,
          of: [
            defineArrayMember({
              type: 'object',
              title: 'Comparison Slider',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Slider Label / Room Name',
                  type: 'string',
                  description: 'e.g., "Main Living Area" or "The Courtyard"',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'beforeImage',
                  title: 'Before Image',
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    defineField({
                      name: 'alt',
                      title: 'Alternative Text',
                      type: 'string',
                      initialValue: 'Before renovation',
                    }),
                  ],
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'afterImage',
                  title: 'After Image',
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    defineField({
                      name: 'alt',
                      title: 'Alternative Text',
                      type: 'string',
                      initialValue: 'After renovation',
                    }),
                  ],
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // --- Material Palette Section ---
    defineField({
      name: 'materials',
      title: 'Material Palette',
      type: 'array',
      description: 'The sensory materials used in this project (Travertine, Teak Wood, etc.).',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Material',
          fields: [
            defineField({
              name: 'name',
              title: 'Material Name',
              type: 'string',
              description: 'e.g. "Travertine"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'origin',
              title: 'Origin / Source',
              type: 'string',
              description: 'e.g. "Italy" or "Local"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'texture',
              title: 'Texture Image',
              type: 'image',
              description: 'Texture mockup or detail zoom image.',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alternative Text',
                  type: 'string',
                  initialValue: 'Material texture sample',
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),

    // --- Galleries (Final Result vs Design Thinking) ---
    defineField({
      name: 'gallery',
      title: 'Final Gallery (Final Result)',
      type: 'array',
      description: 'Photos of the completed project. Supports custom layout grids.',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'width',
              title: 'Display Width',
              type: 'string',
              options: {
                list: [
                  { title: 'Full Width', value: 'col-span-12' },
                  { title: '2/3 Width', value: 'col-span-12 md:col-span-8' },
                  { title: '1/2 Width', value: 'col-span-12 md:col-span-6' },
                  { title: '1/3 Width', value: 'col-span-12 md:col-span-4' },
                ],
              },
              initialValue: 'col-span-12 md:col-span-6',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'aspectRatio',
              title: 'Aspect Ratio',
              type: 'string',
              options: {
                list: [
                  { title: 'Landscape (16:10)', value: 'aspect-[16/10]' },
                  { title: 'Landscape (16:9)', value: 'aspect-[16/9]' },
                  { title: 'Landscape (4:3)', value: 'aspect-[4/3]' },
                  { title: 'Portrait (3:4)', value: 'aspect-[3/4]' },
                  { title: 'Cinematic (21:9)', value: 'aspect-[21/9]' },
                ],
              },
              initialValue: 'aspect-[16/10]',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              validation: (Rule) => Rule.required().warning('Alt text is highly recommended for accessibility.'),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'processGallery',
      title: 'Process Gallery (Design Thinking)',
      type: 'array',
      description: 'Sketches, 3D diagrams, sectional layouts showing design progression.',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'label',
              title: 'Drawing/Process Label',
              type: 'string',
              description: 'e.g. "Initial Massing Study", "Circulation Diagram".',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'width',
              title: 'Display Width',
              type: 'string',
              options: {
                list: [
                  { title: 'Full Width', value: 'col-span-12' },
                  { title: '2/3 Width', value: 'col-span-12 md:col-span-8' },
                  { title: '1/2 Width', value: 'col-span-12 md:col-span-6' },
                  { title: '1/3 Width', value: 'col-span-12 md:col-span-4' },
                ],
              },
              initialValue: 'col-span-12 md:col-span-6',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'aspectRatio',
              title: 'Aspect Ratio',
              type: 'string',
              options: {
                list: [
                  { title: 'Landscape (16:10)', value: 'aspect-[16/10]' },
                  { title: 'Landscape (16:9)', value: 'aspect-[16/9]' },
                  { title: 'Landscape (4:3)', value: 'aspect-[4/3]' },
                  { title: 'Portrait (3:4)', value: 'aspect-[3/4]' },
                  { title: 'Cinematic (21:9)', value: 'aspect-[21/9]' },
                ],
              },
              initialValue: 'aspect-[4/3]',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              validation: (Rule) => Rule.required().warning('Alt text is highly recommended for accessibility.'),
            }),
          ],
        }),
      ],
    }),

    // --- Testimonial Section ---
    defineField({
      name: 'testimonial',
      title: 'Project Testimonial',
      type: 'object',
      description: 'Client review or quote specifically for this project.',
      fields: [
        defineField({
          name: 'text',
          title: 'Testimonial Text',
          type: 'text',
          rows: 3,
          description: 'e.g. "Living here feels like inhabiting a piece of art that breathes..."',
        }),
        defineField({
          name: 'author',
          title: 'Author',
          type: 'string',
          description: 'e.g. "Rahul & Meera Sharma"',
        }),
        defineField({
          name: 'role',
          title: 'Author Role',
          type: 'string',
          description: 'e.g. "Homeowners" or "CEO"',
        }),
      ],
    }),

    // --- Credits (Project Team) ---
    defineField({
      name: 'team',
      title: 'Project Credits (Team)',
      type: 'array',
      description: 'Professional credits for this project (e.g. Principal Architect, Structure Consultants).',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Team Member Credit',
          fields: [
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              description: 'e.g. "Principal Architect" or "Lighting Consultancy"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Name / Organization',
              type: 'string',
              description: 'e.g. "Elena Rodriguez" or "Lumina Studio"',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),

    // --- Reference Link to Next Project ---
    defineField({
      name: 'nextProject',
      title: 'Next Project Link',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'A reference to the project that follows this one in the flow.',
    }),

    // --- Advanced SEO Override ---
    defineField({
      name: 'seo',
      title: 'Project SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'heroImage',
    },
  },
})

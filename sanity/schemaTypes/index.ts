import { type SchemaTypeDefinition } from 'sanity'
import { seoType } from './seoType'
import { projectType } from './projectType'
import { teamMemberType } from './teamMemberType'
import { siteSettingsType } from './siteSettingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [seoType, projectType, teamMemberType, siteSettingsType],
}


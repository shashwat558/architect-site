import type { StructureResolver } from 'sanity/structure'
import { CogIcon } from '@sanity/icons'

// Custom structure to support Singleton documents (e.g. Site Settings)
// and exclude them from the default auto-generated document list.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Manager')
    .items([
      // 1. Singleton: Site Settings
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),
      
      S.divider(),

      // 2. Filtered list: Display all other document types (Projects, Team Members)
      ...S.documentTypeListItems().filter(
        (listItem) => !['siteSettings'].includes(listItem.getId() || '')
      ),
    ])

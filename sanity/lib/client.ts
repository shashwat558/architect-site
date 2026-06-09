import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // Disable stega encoding — halves response payload size for non-Studio consumers
  stega: false,
})

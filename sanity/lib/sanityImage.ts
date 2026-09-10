import { urlFor } from './image'

/**
 * A Sanity image field value as returned by GROQ when selecting the field
 * itself (e.g. `heroImage,` or `gallery[] { ..., }`). Includes the asset
 * reference plus hotspot/crop data and any custom subfields (alt, width…).
 */
export type SanityImageObject = {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
  alt?: string
  [key: string]: unknown
}

/**
 * Build an optimized CDN URL for a Sanity image at the exact display width.
 *
 * - `auto=format` serves AVIF/WebP to browsers that support them.
 * - Hotspot/crop metadata travels with the object, so art direction set in
 *   the Studio is respected whenever a crop is requested.
 * - Plain string sources (static `/public` paths, Unsplash fallbacks) pass
 *   through untouched; nullish/failed inputs resolve to `''` so callers can
 *   fall back with `||`.
 */
export function sanityImg(
  source: SanityImageObject | string | null | undefined,
  width: number,
  options?: { quality?: number; height?: number }
): string {
  if (!source) return ''
  if (typeof source === 'string') return source
  if (!source.asset?._ref) return ''

  try {
    let builder = urlFor(source).width(width).auto('format')
    if (options?.height) {
      builder = builder.height(options.height).fit('crop')
    }
    if (options?.quality) {
      builder = builder.quality(options.quality)
    }
    return builder.url()
  } catch {
    return ''
  }
}

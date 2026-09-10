/**
 * Custom Next.js image loader (see next.config.ts `images.loaderFile`).
 *
 * Sanity CDN URLs already carry transforms (`?w=&auto=format`) and are served
 * from a global edge cache — routing them back through `/_next/image` forces
 * OUR server to download + re-encode every variant, which times out on slow
 * egress ("upstream image response timed out"). So Sanity sources resolve
 * straight to the CDN (with the requested width applied), while local files
 * and other remotes keep the default Next optimizer path.
 *
 * Browser-safe: no Node APIs (this runs client-side to build srcsets too).
 */

type LoaderParams = {
  src: string
  width: number
  quality?: number
}

export default function sanityImageLoader({ src, width, quality }: LoaderParams): string {
  if (src.includes('cdn.sanity.io')) {
    const url = new URL(src)
    url.searchParams.set('w', String(width))
    url.searchParams.set('auto', 'format')
    if (quality) {
      url.searchParams.set('q', String(quality))
    }
    return url.toString()
  }

  const q = quality ?? 75
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${q}`
}

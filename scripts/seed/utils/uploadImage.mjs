/**
 * Upload an image from a URL to Sanity's asset store.
 * Returns the real Sanity asset reference object.
 *
 * Caches results in-memory so the same URL is only uploaded once per run.
 */

const cache = new Map();

/**
 * @param {import('@sanity/client').SanityClient} client
 * @param {string} url  - Public image URL to fetch and upload
 * @param {string} [filename] - Optional filename hint for Sanity
 * @returns {Promise<{ _type: 'image', asset: { _type: 'reference', _ref: string } }>}
 */
export async function uploadImageFromUrl(client, url, filename) {
  if (cache.has(url)) return cache.get(url);

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch image: ${url} (${response.status})`);

  const buffer = Buffer.from(await response.arrayBuffer());
  const contentType = response.headers.get('content-type') || 'image/jpeg';
  const ext = contentType.split('/')[1]?.split(';')[0] || 'jpg';
  const name = filename ? `${filename}.${ext}` : `seed-image-${Date.now()}.${ext}`;

  const asset = await client.assets.upload('image', buffer, {
    filename: name,
    contentType,
  });

  const result = {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
  };

  cache.set(url, result);
  return result;
}

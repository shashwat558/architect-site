#!/usr/bin/env node
/**
 * AD.RS Design Studio — Site imagery bootstrap (one-shot, idempotent)
 * ─────────────────────────────────────────────────────────────────────
 * Creates the `siteSettings` singleton the Studio edits (copying text content
 * from the legacy `demo-settings-01` doc when present) and uploads the brand
 * files from /public into their Sanity image fields:
 *
 *   public/logo.png          → logo
 *   public/her-image-2.webp  → homeHero.backgroundImage
 *   public/process.jpeg      → processHeroImage
 *   public/footer.jpeg       → footerBackground
 *
 * Existing Studio-set images are NEVER overwritten (setIfMissing).
 *
 * Run:
 *   node scripts/seed-site-imagery.mjs
 *
 * Requires: NEXT_PUBLIC_SANITY_PROJECT_ID + SANITY_API_TOKEN in .env
 */
import 'dotenv/config';
import { createReadStream, existsSync } from 'node:fs';
import { createClient } from '@sanity/client';

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production';
const API_TOKEN = process.env.SANITY_API_TOKEN;

if (!PROJECT_ID) {
  console.error('\nMissing NEXT_PUBLIC_SANITY_PROJECT_ID env variable.\n');
  process.exit(1);
}
if (!API_TOKEN) {
  console.error('\nMissing SANITY_API_TOKEN env variable. Generate one at sanity.io/manage (Editor+ role).\n');
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2026-06-02',
  token: API_TOKEN,
  useCdn: false,
});

const SINGLETON_ID = 'siteSettings';

const uploads = [
  { file: 'public/logo.png', field: 'logo', alt: 'AD.RS Design Studio logo', filename: 'logo.png' },
  { file: 'public/her-image-2.webp', field: 'homeHero.backgroundImage', alt: 'Architectural scenic landscape', filename: 'hero-background.webp' },
  { file: 'public/process.jpeg', field: 'processHeroImage', alt: 'Architectural workspace', filename: 'process-hero.jpeg' },
  { file: 'public/footer.jpeg', field: 'footerBackground', alt: 'AD.RS Design Studio Background', filename: 'footer-background.jpeg' },
];

async function ensureSingleton() {
  const existing = await client.fetch(`*[_id == $id][0]{ _id }`, { id: SINGLETON_ID });
  if (existing) {
    console.log(`Singleton "${SINGLETON_ID}" already exists — keeping it.`);
    return;
  }

  // Clone text content from the legacy seed doc so editors lose nothing.
  const legacy = await client.fetch(`*[_id == "demo-settings-01"][0]`);
  const base = {
    _id: SINGLETON_ID,
    _type: 'siteSettings',
    siteName: legacy?.siteName ?? 'AD.RS Design Studio',
    homeHero: {
      _type: 'object',
      title: legacy?.homeHero?.title ?? 'Quiet Spaces, Profound Feeling.',
      subtitle: legacy?.homeHero?.subtitle ?? '',
      ctaText: legacy?.homeHero?.ctaText ?? 'View Our Projects',
      ctaLink: legacy?.homeHero?.ctaLink ?? '/projects',
    },
    contactInfo: legacy?.contactInfo ?? { _type: 'object' },
    socialLinks: legacy?.socialLinks ?? [],
    globalSeo: legacy?.globalSeo ?? { _type: 'object' },
  };

  await client.createIfNotExists(base);
  console.log(`Created singleton "${SINGLETON_ID}" (text cloned from demo-settings-01).`);
}

async function uploadLocalFile({ file, alt, filename }) {
  if (!existsSync(file)) {
    console.warn(`  SKIP — file not found: ${file}`);
    return null;
  }
  const asset = await client.assets.upload('image', createReadStream(file), { filename });
  console.log(`  uploaded ${file} → ${asset._id}`);
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt,
  };
}

async function main() {
  await ensureSingleton();

  for (const job of uploads) {
    // Never clobber an image an editor already set in the Studio.
    const current = await client.fetch(`*[_id == $id][0]{ "has": defined(${job.field}) }`, {
      id: SINGLETON_ID,
    });
    if (current?.has) {
      console.log(`  SKIP — ${job.field} already set in Studio.`);
      continue;
    }
    const value = await uploadLocalFile(job);
    if (!value) continue;
    // Dotted paths (homeHero.backgroundImage) are supported by patch ops.
    await client.patch(SINGLETON_ID).setIfMissing({ [job.field]: value }).commit();
    console.log(`  set ${job.field}`);
  }

  console.log('\nDone. Verify in Studio → Site Settings, then deploy.');
}

main().catch((err) => {
  console.error('\nFailed:', err.message);
  process.exit(1);
});

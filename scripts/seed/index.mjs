#!/usr/bin/env node
/**
 * AD.RS Design Studio — Sanity CMS Seeding Script
 * ─────────────────────────────────────────────────
 * Run:
 *   npm run seed          → Seed demo content (idempotent)
 *   npm run seed:clear    → Remove all previously seeded demo content
 */

import 'dotenv/config';
import { createClient } from '@sanity/client';
import { getTeamMemberSeeds } from './generators/teamMembers.mjs';
import { getProjectSeeds }    from './generators/projects.mjs';
import { siteSettingsSeeds } from './generators/siteSettings.mjs';
import { log, summary }    from './utils/logger.mjs';
import { uploadImageFromUrl } from './utils/uploadImage.mjs';

// ─── Config & Client ─────────────────────────────────────────────────────────

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET    || process.env.SANITY_DATASET    || 'production';
const API_TOKEN  = process.env.SANITY_API_TOKEN;

if (!PROJECT_ID) {
  console.error('\n❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_PROJECT_ID env variable.\n');
  process.exit(1);
}
if (!API_TOKEN) {
  console.error('\n❌  Missing SANITY_API_TOKEN env variable. Generate one at sanity.io/manage.\n');
  process.exit(1);
}

export const client = createClient({
  projectId: PROJECT_ID,
  dataset:   DATASET,
  apiVersion: '2026-06-02',
  token:      API_TOKEN,
  useCdn:     false,
});

// ─── Retry Helper ─────────────────────────────────────────────────────────────

export async function withRetry(fn, label, retries = 3, delay = 1500) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === retries) throw err;
      log.warn(`Attempt ${attempt}/${retries} failed for "${label}": ${err.message}. Retrying in ${delay}ms…`);
      await new Promise(r => setTimeout(r, delay * attempt));
    }
  }
}

// ─── Image Upload Helper (with idempotency via Sanity label) ──────────────────

/**
 * Uploads an image from a URL to Sanity and returns the image field value.
 * Uses a stable `label` so the same image is not re-uploaded on re-runs.
 */
async function resolveImage(url, label, alt) {
  log.info(`  ↑ Uploading image: ${label}…`);
  const imageAsset = await withRetry(
    () => uploadImageFromUrl(client, url, label),
    `upload-${label}`
  );
  return { ...imageAsset, alt };
}

// ─── Seed All ─────────────────────────────────────────────────────────────────

async function seed() {
  log.title('AD.RS Design Studio — Sanity Seeder');
  log.info(`Project: ${PROJECT_ID} | Dataset: ${DATASET}`);

  const counts = {};

  // 1. Team Members — upload portraits first, then seed
  log.step('Uploading team member portraits…');
  const teamMemberSeeds = await getTeamMemberSeeds(resolveImage);
  counts.teamMember = await seedCollection('teamMember', teamMemberSeeds);

  // 2. Projects — upload hero images first, then seed
  log.step('Uploading project hero images…');
  const projectSeeds = await getProjectSeeds(resolveImage);
  counts.project = await seedCollection('project', projectSeeds);

  // 3. Site Settings (singleton, no images)
  counts.siteSettings = await seedCollection('siteSettings', siteSettingsSeeds);

  summary(counts);
}

// ─── Clear Demo Content ────────────────────────────────────────────────────────

async function clear() {
  log.title('AD.RS Design Studio — Clearing Seeded Demo Content');

  const types = ['project', 'teamMember', 'siteSettings'];

  for (const type of types) {
    log.step(`Fetching demo documents of type "${type}"…`);
    const docs = await withRetry(
      () => client.fetch(`*[_type == $type && isDemoContent == true]{ _id }`, { type }),
      `fetch-${type}`
    );

    if (!docs.length) {
      log.info(`  No demo "${type}" documents found.`);
      continue;
    }

    log.info(`  Found ${docs.length} demo document(s). Deleting…`);
    const tx = client.transaction();
    docs.forEach(({ _id }) => tx.delete(_id));
    await withRetry(() => tx.commit(), `delete-${type}`);
    log.ok(`  ✓ Deleted ${docs.length} "${type}" document(s).`);
  }

  log.ok('\n✅  All demo content cleared.\n');
}

// ─── Collection Seeder ────────────────────────────────────────────────────────

async function seedCollection(type, seeds) {
  log.step(`Seeding "${type}" (${seeds.length} documents)…`);
  let created = 0;

  for (const seed of seeds) {
    const docId = seed._id;

    // Idempotency: check if already exists
    const existing = await withRetry(
      () => client.fetch(`*[_id == $id][0]{ _id }`, { id: docId }),
      `check-${docId}`
    );

    if (existing) {
      log.info(`  [skip] ${docId} already exists.`);
      continue;
    }

    const doc = { ...seed, _type: type, isDemoContent: true };

    await withRetry(
      () => client.createOrReplace(doc),
      `create-${docId}`
    );

    log.ok(`  [+] ${docId} created.`);
    created++;

    // Gentle rate limiting
    await new Promise(r => setTimeout(r, 80));
  }

  log.info(`  → ${created} new document(s) created for "${type}".`);
  return created;
}

// ─── Entry Point ──────────────────────────────────────────────────────────────

const command = process.argv[2];
if (command === 'clear') {
  clear().catch(err => { console.error(err); process.exit(1); });
} else {
  seed().catch(err => { console.error(err); process.exit(1); });
}

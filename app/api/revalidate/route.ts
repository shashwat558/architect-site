import { createHash, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-demand ISR revalidation for Sanity webhook deliveries.
 *
 * Setup in Sanity Manage → API → Webhooks:
 *   URL:     https://<your-prod-domain>/api/revalidate
 *   Dataset: production
 *   Trigger: Create / Update / Delete
 *   Filter:  _type in ["siteSettings", "siteContent", "project", "testimonial", "teamMember", "offer"]
 *   Header:  Authorization: Bearer <SANITY_REVALIDATE_SECRET>
 *
 * Revalidates the whole app router tree (`/`, `layout`), so the next
 * visitor gets HTML built from the just-published Sanity content instead
 * of waiting out the `revalidate: 300` ISR window.
 */

function isAuthorized(request: NextRequest, secret: string): boolean {
  const header = request.headers.get("authorization") ?? "";
  const bearer = header.startsWith("Bearer ") ? header.slice("Bearer ".length) : "";
  // Sanity webhooks can also carry the secret as a URL query param.
  const token = bearer || request.nextUrl.searchParams.get("secret") || "";
  if (!token) return false;

  // Hash first so timingSafeEqual never throws on length mismatch.
  const digest = (value: string) => createHash("sha256").update(value, "utf8").digest();
  return timingSafeEqual(digest(token), digest(secret));
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    console.error("POST /api/revalidate: SANITY_REVALIDATE_SECRET is not set");
    return NextResponse.json(
      { revalidated: false, error: "Revalidation is not configured" },
      { status: 500 }
    );
  }

  if (!isAuthorized(request, secret)) {
    return NextResponse.json(
      { revalidated: false, error: "Invalid secret" },
      { status: 401 }
    );
  }

  try {
    // Purge the full page tree under the root layout (home + all routes).
    revalidatePath("/", "layout");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.error("POST /api/revalidate error:", error);
    return NextResponse.json(
      { revalidated: false, error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}

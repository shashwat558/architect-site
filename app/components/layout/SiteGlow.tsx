"use client";

import { usePathname } from "next/navigation";

/**
 * Site-wide bottom amber glow.
 *
 * A viewport-fixed layer that blooms up from the bottom edge on every page
 * except /studio (and /admin, which has its own canvas). Rendered from
 * LayoutWrapper so it lives in the layout, not per-page.
 *
 * Why this construction:
 * - `fixed` + bottom-anchored: identical placement on every route and every
 *   screen size. Percentage-based `radial-gradient`s resolve against the box,
 *   so the radii use `vmax` units — the glow keeps the same punchy shape on a
 *   390px phone and a 1440px desktop instead of collapsing into a band.
 * - `100dvh` (with `100vh` fallback): tracks the real visual viewport when
 *   the mobile URL bar shows/hides, so the glow can't jump or detach.
 * - `translateZ(0)`: promotes the layer so mobile compositors keep it glued
 *   during momentum scroll instead of dropping/tearing it.
 * - `-z-10`: floats above the body canvas background but below all content.
 *   Pages must keep their root wrappers transparent (the canvas base IS the
 *   cream #FAF6F1) or they'll bury it again.
 */
export default function SiteGlow() {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio") || pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 bottom-0 -z-10 pointer-events-none h-[100vh] select-none"
      style={{
        // `100dvh` wins where supported; unsupported browsers drop the invalid
        // value and fall back to the `h-[100vh]` class above.
        height: "100dvh",
        backgroundImage:
          "radial-gradient(150vmax 110vmax at 50% 115%, #f59e0b 0%, rgba(245, 158, 11, 0.65) 32%, rgba(245, 158, 11, 0.25) 52%, transparent 72%)",
        transform: "translateZ(0)",
      }}
    />
  );
}

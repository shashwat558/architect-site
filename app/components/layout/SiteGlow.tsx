"use client";

import { usePathname } from "next/navigation";

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
          "radial-gradient(120vmax 90vmax at 50% 120%, rgba(251, 191, 90, 0.35) 0%, rgba(251, 191, 90, 0.18) 28%, rgba(251, 191, 90, 0.08) 48%, transparent 68%)",
        transform: "translateZ(0)",
      }}
    />
  );
}

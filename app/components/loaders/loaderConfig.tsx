/**
 * Loader Configuration
 * Only the active loader is bundled. To switch, swap the dynamic import below.
 */

import dynamic from "next/dynamic";

export const getActiveLoader = () =>
  dynamic(() => import("./CinematicLoader"), {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d0d0d]" />
    ),
  });

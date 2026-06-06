"use client";

import { IconAlertTriangle } from "@tabler/icons-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-4">
      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <IconAlertTriangle size={24} className="text-red-600" />
      </div>
      <h2 className="text-lg font-semibold text-slate-900 mb-2">
        Something went wrong
      </h2>
      <p className="text-sm text-slate-500 mb-6 max-w-sm">
        {error.message || "An unexpected error occurred while loading this page."}
      </p>
      <button
        onClick={reset}
        className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}

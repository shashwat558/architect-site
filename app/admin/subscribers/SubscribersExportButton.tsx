"use client";

import { IconDownload } from "@tabler/icons-react";

export function SubscribersExportButton({ emails }: { emails: string[] }) {
  const handleExport = () => {
    const content = emails.join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
    >
      <IconDownload size={16} />
      Export {emails.length} emails
    </button>
  );
}

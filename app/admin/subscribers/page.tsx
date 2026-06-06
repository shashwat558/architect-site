import { prisma } from "@/lib/prisma";
import { IconBell } from "@tabler/icons-react";
import { SubscribersExportButton } from "./SubscribersExportButton";

export default async function SubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Subscribers</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""}
          </p>
        </div>
        {subscribers.length > 0 && (
          <SubscribersExportButton
            emails={subscribers.map((s: (typeof subscribers)[number]) => s.email)}
          />
        )}
      </div>

      <div className="bg-white rounded-xl ring-1 ring-slate-200 shadow-sm overflow-hidden">
        {subscribers.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <IconBell className="mx-auto mb-3 text-slate-200" size={40} />
            <p className="font-medium">No subscribers yet</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {subscribers.map((sub: (typeof subscribers)[number]) => (
              <li key={sub.id} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-slate-900">{sub.email}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Joined{" "}
                    {new Date(sub.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <a
                  href={`mailto:${sub.email}`}
                  className="text-xs text-slate-500 hover:text-slate-900 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Email
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

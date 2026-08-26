import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  IconMail,
  IconBell,
  IconArrowRight,
  IconExternalLink,
} from "@tabler/icons-react";

async function getStats() {
  const [contact, subscribers] = await Promise.all([
    prisma.contactSubmission.count(),
    prisma.subscriber.count(),
  ]);
  return { contact, subscribers };
}

const statCards = [
  {
    key: "contact" as const,
    label: "Contact Submissions",
    href: "/admin/contact",
    icon: IconMail,
    color: "bg-emerald-50 text-emerald-600",
    ring: "ring-emerald-100",
  },
  {
    key: "subscribers" as const,
    label: "Subscribers",
    href: "/admin/subscribers",
    icon: IconBell,
    color: "bg-rose-50 text-rose-600",
    ring: "ring-rose-100",
  },
];

const sanityLinks = [
  { label: "Manage Projects", path: "project" },
  { label: "Manage Team", path: "teamMember" },
  { label: "Manage Offers", path: "offer" },
];

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">
          Welcome back — here&apos;s a live overview of your content.
        </p>
      </div>

      {/* Operational stat cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {statCards.map(({ key, label, href, icon: Icon, color, ring }) => (
          <Link
            key={key}
            href={href}
            className={`group bg-white rounded-xl p-6 ring-1 ${ring} shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-5`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}
            >
              <Icon size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="text-3xl font-bold text-slate-900 mt-0.5">
                {stats[key]}
              </p>
            </div>
            <IconArrowRight
              size={18}
              className="text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all"
            />
          </Link>
        ))}
      </div>

      {/* Content managed in Sanity Studio */}
      <div className="mt-10">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
          Content Management
        </h2>
        <p className="text-xs text-slate-400 mb-4">
          Projects, team members, and offers are managed in Sanity Studio.
        </p>
        <div className="flex flex-wrap gap-3">
          {sanityLinks.map(({ label, path }) => (
            <a
              key={path}
              href={`/studio/structure/${path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 text-sm font-medium rounded-lg ring-1 ring-slate-200 hover:bg-slate-50 transition-colors"
            >
              <IconExternalLink size={15} />
              {label}
            </a>
          ))}
          <a
            href="/studio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
          >
            <IconExternalLink size={15} />
            Open Sanity Studio
          </a>
        </div>
      </div>
    </div>
  );
}

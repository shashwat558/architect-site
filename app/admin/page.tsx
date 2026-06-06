import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  IconFolderOpen,
  IconUsers,
  IconTag,
  IconMail,
  IconBell,
  IconUpload,
  IconArrowRight,
} from "@tabler/icons-react";

async function getStats() {
  const [projects, team, offers, contact, unreadContact, subscribers] =
    await Promise.all([
      prisma.project.count(),
      prisma.teamMember.count(),
      prisma.offer.count(),
      prisma.contactSubmission.count(),
      // If you add a `read` field later, swap this for: { where: { read: false } }
      prisma.contactSubmission.count(),
      prisma.subscriber.count(),
    ]);

  return { projects, team, offers, contact, unreadContact, subscribers };
}

const statCards = [
  {
    key: "projects" as const,
    label: "Projects",
    href: "/admin/projects",
    icon: IconFolderOpen,
    color: "bg-violet-50 text-violet-600",
    ring: "ring-violet-100",
  },
  {
    key: "team" as const,
    label: "Team Members",
    href: "/admin/team",
    icon: IconUsers,
    color: "bg-sky-50 text-sky-600",
    ring: "ring-sky-100",
  },
  {
    key: "offers" as const,
    label: "Offers",
    href: "/admin/offers",
    icon: IconTag,
    color: "bg-amber-50 text-amber-600",
    ring: "ring-amber-100",
  },
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

      {/* Stat cards */}
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

      {/* Quick actions */}
      <div className="mt-10">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
          >
            <IconFolderOpen size={16} />
            Add Project
          </Link>
          <Link
            href="/admin/team"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 text-sm font-medium rounded-lg ring-1 ring-slate-200 hover:bg-slate-50 transition-colors"
          >
            <IconUsers size={16} />
            Add Team Member
          </Link>
          <Link
            href="/admin/upload"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 text-sm font-medium rounded-lg ring-1 ring-slate-200 hover:bg-slate-50 transition-colors"
          >
            <IconUpload size={16} />
            Upload Images
          </Link>
        </div>
      </div>
    </div>
  );
}

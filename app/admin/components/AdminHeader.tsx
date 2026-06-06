"use client";

import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { IconChevronRight, IconLogout } from "@tabler/icons-react";
import { adminNavLinks } from "../config/nav";

interface AdminHeaderProps {
  user?: {
    name?: string | null;
    email?: string | null;
  };
}

function getBreadcrumb(pathname: string) {
  const link = [...adminNavLinks]
    .sort((a, b) => b.href.length - a.href.length)
    .find((l) => (l.exact ? pathname === l.href : pathname.startsWith(l.href)));
  return link?.label ?? "Admin";
}

function getInitials(user: AdminHeaderProps["user"]) {
  const name = user?.name || user?.email || "";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const pathname = usePathname();
  const section = getBreadcrumb(pathname);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 lg:px-8 gap-4 shrink-0">
      {/* Left spacer for mobile toggle */}
      <div className="w-10 lg:hidden" />

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm min-w-0">
        <span className="text-slate-400 hidden sm:inline">Admin</span>
        <IconChevronRight size={14} className="text-slate-300 hidden sm:inline" />
        <span className="font-semibold text-slate-800 truncate">{section}</span>
      </div>

      {/* Right: user + sign out */}
      <div className="ml-auto flex items-center gap-3">
        {user && (
          <>
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                {getInitials(user)}
              </div>
              <span className="text-sm text-slate-700 truncate max-w-[160px]">
                {user.name || user.email}
              </span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              title="Sign out"
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <IconLogout size={16} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
}

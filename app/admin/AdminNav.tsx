"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface AdminNavProps {
  user?: {
    name?: string | null;
    email?: string | null;
  };
}

export function AdminNav({ user }: AdminNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close drawer when pathname changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/projects", label: "Projects" },
    { href: "/admin/team", label: "Team" },
    { href: "/admin/offers", label: "Offers" },
    { href: "/admin/contact", label: "Contact" },
    { href: "/admin/subscribers", label: "Subscribers" },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 gap-2">
          <div className="flex min-w-0 items-center">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="admin-mobile-nav"
              aria-label={open ? "Close navigation" : "Open navigation"}
              className="sm:hidden -ml-2 mr-2 inline-flex items-center justify-center w-11 h-11 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <>
                    <path d="M3 6h18" />
                    <path d="M3 12h18" />
                    <path d="M3 18h18" />
                  </>
                )}
              </svg>
            </button>
            <h1 className="text-base sm:text-xl font-bold flex-shrink-0">AD.RS Admin</h1>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive(link.href)
                      ? "border-indigo-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {user && (
              <>
                <span className="hidden md:inline text-sm text-gray-700 truncate max-w-[180px]">
                  {user.name || user.email}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/admin/login" })}
                  className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 min-h-11"
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div id="admin-mobile-nav" className="sm:hidden pb-3 border-t border-gray-100">
            <ul className="flex flex-col gap-1 pt-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-3 py-3 rounded-md text-sm font-medium ${
                      isActive(link.href)
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

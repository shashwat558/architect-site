"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminNavProps {
  user?: {
    name?: string | null;
    email?: string | null;
  };
}

export function AdminNav({ user }: AdminNavProps) {
  const pathname = usePathname();

  const navLinks = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/projects", label: "Projects" },
    { href: "/admin/team", label: "Team" },
    { href: "/admin/offers", label: "Offers" },
    { href: "/admin/home-images", label: "Home Images" },
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
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold">AD.RS Admin</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
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
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <span className="text-sm text-gray-700">
                  {user.name || user.email}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/admin/login" })}
                  className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

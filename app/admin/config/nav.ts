export const adminNavLinks = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: "LayoutDashboard",
    exact: true,
  },
  {
    href: "/admin/projects",
    label: "Projects",
    icon: "FolderOpen",
    exact: false,
  },
  {
    href: "/admin/team",
    label: "Team",
    icon: "Users",
    exact: false,
  },
  {
    href: "/admin/offers",
    label: "Offers",
    icon: "Tag",
    exact: false,
  },
  {
    href: "/admin/contact",
    label: "Contact",
    icon: "Mail",
    exact: false,
  },
  {
    href: "/admin/subscribers",
    label: "Subscribers",
    icon: "Bell",
    exact: false,
  },
  {
    href: "/admin/upload",
    label: "Upload",
    icon: "Upload",
    exact: false,
  },
] as const;

export type AdminNavLink = (typeof adminNavLinks)[number];

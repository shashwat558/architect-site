/**
 * Site-wide navigation configuration.
 *
 * Keep all nav links in one place — Header, Footer, and MenuOverlay
 * all consume from this single source of truth.
 */

export type NavLink = {
  name: string;
  href: string;
};

/** Primary navigation items shown in Header and MenuOverlay */
export const primaryNav: NavLink[] = [
  { name: "Work", href: "/projects" },
  { name: "Process", href: "/process" },
  { name: "Offers", href: "/offers" },
  { name: "About", href: "/about" },
  { name: "Resources", href: "/resources" },
];

/** Footer-specific page links */
export const footerPages: NavLink[] = [
  { name: "Welcome", href: "/" },
  ...primaryNav,
  { name: "Contact", href: "/contact" },
];

/** Footer featured project links */
export const footerProjects: NavLink[] = [
  { name: "Modern Residence", href: "/projects/modern-residence" },
  { name: "Green Office", href: "/projects/green-office" },
  { name: "Rustic Chalet", href: "/projects/rustic-chalet" },
  { name: "Urban Apartment", href: "/projects/urban-apartment" },
];

/** External social network links */
export const socialNetworks: NavLink[] = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
];

/** Resource sub-links */
export const resourceLinks: NavLink[] = [
  { name: "Items", href: "/resources/items" },
  { name: "Videos", href: "/resources/videos" },
  { name: "White papers", href: "/resources/white-papers" },
];

/** Legal links */
export const legalLinks: NavLink[] = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Legal notice", href: "/legal" },
];

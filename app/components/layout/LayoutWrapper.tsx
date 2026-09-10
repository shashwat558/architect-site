"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import SiteGlow from "./SiteGlow";

// Header and Footer are client components so this wrapper must stay "use client".
// Optimization: memoize the pathname check so the expensive Header/Footer
// subtree does not re-render on every unrelated state change.
export type SiteImagery = {
  logoUrl?: string | null;
  footerBgUrl?: string | null;
};

export default function LayoutWrapper({
  children,
  siteImagery,
}: {
  children: React.ReactNode;
  siteImagery?: SiteImagery;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen relative">
      <SiteGlow />
      <Header logoUrl={siteImagery?.logoUrl} />
      <div id="main-content">{children}</div>
      <Footer footerBgUrl={siteImagery?.footerBgUrl} />
    </div>
  );
}

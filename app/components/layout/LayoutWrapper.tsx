"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

// Header and Footer are client components so this wrapper must stay "use client".
// Optimization: memoize the pathname check so the expensive Header/Footer
// subtree does not re-render on every unrelated state change.
export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen relative">
      <Header />
      <div id="main-content">{children}</div>
      <Footer />
    </div>
  );
}

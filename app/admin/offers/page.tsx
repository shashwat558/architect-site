import { prisma } from "@/lib/prisma";
import { OffersClient } from "./OffersClient";

export default async function OffersPage() {
  const offers = await prisma.offer.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <OffersClient initialOffers={offers} />;
}

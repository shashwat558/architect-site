import { prisma } from "@/lib/prisma";
import { TeamClient } from "./TeamClient";

export default async function TeamPage() {
  const members = await prisma.teamMember.findMany({
    orderBy: { createdAt: "asc" },
  });

  return <TeamClient initialMembers={members} />;
}

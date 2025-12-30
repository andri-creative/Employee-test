import prisma from "./prisma";

export async function getPositions() {
  const result = await prisma.employee.findMany({
    distinct: ["position"],
    select: {
      position: true,
    },
    orderBy: {
      position: "asc",
    },
  });

  return result.map((r) => r.position);
}

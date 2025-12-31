import prisma from "./prisma";
import { getCache, setCache } from "./cache";

export async function getPositions() {
  const cacheKey = "positions";

  const cached = getCache(cacheKey);
  if (cached) {
    console.log("✅ Positions loaded from cache");
    return cached;
  }

  const result = await prisma.employee.findMany({
    distinct: ["position"],
    select: {
      position: true,
    },
    orderBy: {
      position: "asc",
    },
  });

  const positions = result.map((r) => r.position);

  setCache(cacheKey, positions);
  console.log("💾 Positions saved to cache");

  return positions;
}

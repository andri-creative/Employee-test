import prisma from "./prisma";
import { getCache, setCache } from "./cache";

export async function getAgeDistribution() {
  const cacheKey = "age_distribution";

  const cached = getCache(cacheKey);
  if (cached) {
    console.log("✅ Age distribution loaded from cache");
    return cached;
  }

  const ranges = [
    { label: "20-29", min: 20, max: 29 },
    { label: "30-39", min: 30, max: 39 },
    { label: "40-49", min: 40, max: 49 },
    { label: "50+", min: 50 },
  ];

  const results = await Promise.all(
    ranges.map(async (range) => {
      const count = await prisma.employee.count({
        where: {
          age: {
            gte: range.min,
            ...(range.max ? { lte: range.max } : {}),
          },
        },
      });

      return {
        ageRange: range.label,
        total: count,
      };
    })
  );

  setCache(cacheKey, results);
  console.log("💾 Age distribution saved to cache");

  return results;
}

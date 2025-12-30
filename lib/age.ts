import prisma from "./prisma";

export async function getAgeDistribution() {
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

  return results;
}

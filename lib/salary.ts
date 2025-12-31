import prisma from "./prisma";
import { getCache, setCache } from "./cache";

export async function getAverageSalaryByPosition() {
  const cacheKey = "avg_salary_by_position";

  const cached = getCache(cacheKey);
  if (cached) {
    console.log("✅ Average salary loaded from cache");
    return cached;
  }

  const result = await prisma.employee.groupBy({
    by: ["position"],
    _avg: {
      salary: true,
    },
    orderBy: {
      _avg: {
        salary: "desc",
      },
    },
  });

  const salaryData = result.map((item) => ({
    position: item.position,
    avgSalary: Math.round(item._avg.salary ?? 0),
  }));

  setCache(cacheKey, salaryData);
  console.log("💾 Average salary saved to cache");

  return salaryData;
}

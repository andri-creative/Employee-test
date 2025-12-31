import prisma from "./prisma";
import { getCache, setCache } from "./cache";

export async function getEmployeeKpis() {
  const cacheKey = "employee_kpis";

  const cached = getCache(cacheKey);
  if (cached) {
    console.log("✅ KPIs loaded from cache");
    return cached;
  }

  // Query asli kamu yang sudah optimal
  const [totalEmployee, avgAge, avgSalary, highestSalary, mostCommonPosition] =
    await Promise.all([
      prisma.employee.count(),

      prisma.employee.aggregate({
        _avg: { age: true },
      }),

      prisma.employee.aggregate({
        _avg: { salary: true },
      }),

      prisma.employee.aggregate({
        _max: { salary: true },
      }),

      prisma.employee.groupBy({
        by: ["position"],
        _count: { position: true },
        orderBy: {
          _count: {
            position: "desc",
          },
        },
        take: 1,
      }),
    ]);

  const kpis = {
    totalEmployee,
    averageAge: Math.round(avgAge._avg.age ?? 0),
    averageSalary: Math.round(avgSalary._avg.salary ?? 0),
    highestSalary: highestSalary._max.salary ?? 0,
    mostCommonPosition: mostCommonPosition[0]?.position ?? "-",
  };

  setCache(cacheKey, kpis);
  console.log("💾 KPIs saved to cache");

  return kpis;
}

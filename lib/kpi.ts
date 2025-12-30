import prisma from "./prisma";

export async function getEmployeeKpis() {
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

  return {
    totalEmployee,
    averageAge: Math.round(avgAge._avg.age ?? 0),
    averageSalary: Math.round(avgSalary._avg.salary ?? 0),
    highestSalary: highestSalary._max.salary ?? 0,
    mostCommonPosition: mostCommonPosition[0]?.position ?? "-",
  };
}

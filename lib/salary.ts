import prisma from "./prisma";

export async function getAverageSalaryByPosition() {
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

  return result.map((item) => ({
    position: item.position,
    avgSalary: Math.round(item._avg.salary ?? 0),
  }));
}

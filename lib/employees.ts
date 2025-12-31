import prisma from "./prisma";
import { getCache, setCache } from "./cache";

export async function getEmployees({
  page,
  pageSize,
  position,
  search,
}: {
  page: number;
  pageSize: number;
  position?: string;
  search?: string;
}) {
  const cacheKey = `employees:${page}:${pageSize}:${position || "all"}:${
    search || "none"
  }`;

  if (!search) {
    const cached = getCache(cacheKey);
    if (cached) {
      console.log("✅ Employees loaded from cache");
      return cached;
    }
  }

  const where: any = {};

  if (position) {
    where.position = position;
  }

  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  const [totalCount, data] = await Promise.all([
    prisma.employee.count({ where }),
    prisma.employee.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        position: true,
        age: true,
        salary: true,
      },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const result = {
    data,
    page,
    pageSize,
    totalPages,
    totalCount,
  };

  if (!search) {
    setCache(cacheKey, result);
    console.log("💾 Employees saved to cache");
  }

  return result;
}

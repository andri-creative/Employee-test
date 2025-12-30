import prisma from "./prisma";

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

  // ✅ total data
  const totalCount = await prisma.employee.count({ where });

  // ✅ total halaman
  const totalPages = Math.ceil(totalCount / pageSize);

  const data = await prisma.employee.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { name: "asc" },
  });

  return {
    data,
    page,
    pageSize,
    totalPages,
    totalCount,
  };
}

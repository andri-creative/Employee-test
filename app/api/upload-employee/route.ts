import { NextResponse } from "next/server";
import Papa from "papaparse";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const employeeFile = await req.formData();
  const fileEmployee = employeeFile.get("employeeFile") as File;

  if (!fileEmployee) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  const text = await fileEmployee.text();

  const { data } = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
  });

  const employees = data.map((row: any) => ({
    name: row.name,
    age: Number(row.age),
    position: row.position,
    salary: Number(row.salary),
  }));

  await prisma.employee.createMany({
    data: employees,
  });

  return NextResponse.json({
    message: "Upload success",
    total: employees.length,
  });
}

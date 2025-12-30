import { PrismaClient, Prisma } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

interface Employee {
  name: string;
  age: number;
  position: string;
  salary: number;
}

const employees: Employee[] = [
  {
    name: "John Doe",
    age: 30,
    position: "Software Engineer",
    salary: 5000,
  },
];

export async function main() {
  try {
    for (const employee of employees) {
      await prisma.employee.create({
        data: employee,
      });
    }
    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Jika file ini dijalankan langsung
if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card, Flex } from "@radix-ui/themes";
import { EmployeeTableHeader } from "./EmployeeTableHeader";
import { EmployeeFilters } from "./EmployeeFilters";
import { EmployeeDesktopTable } from "./EmployeeDesktopTable";
import { EmployeeMobileCards } from "./EmployeeMobileCards";
import { EmployeePagination } from "./EmployeePagination";

interface Employee {
  id: string;
  name: string;
  age: number;
  position: string;
  salary: number;
  createdAt?: Date;
}

interface EmployeeTableProps {
  employees: {
    data: Employee[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
  };
  positions: string[];
  selectedPosition?: string;
  searchValue?: string;
}

export default function EmployeeTable({
  employees,
  positions,
  selectedPosition,
  searchValue,
}: EmployeeTableProps) {
  const router = useRouter();
  const params = useSearchParams();

  const page = Number(params.get("page")) || employees.page;
  const position = params.get("position") ?? "all";
  const search = params.get("search") ?? "";

  const updateParam = (key: string, value?: string, resetPage = false) => {
    const newParams = new URLSearchParams(params.toString());

    if (value) newParams.set(key, value);
    else newParams.delete(key);

    if (resetPage) newParams.set("page", "1");

    router.push(`?${newParams.toString()}`, {
      scroll: false,
    });
  };

  const getSalaryColor = (salary: number) => {
    if (salary >= 15000000) return "green";
    if (salary >= 10000000) return "blue";
    return "gray";
  };

  return (
    <Card size="3" style={{ marginTop: "1.5rem" }}>
      <Flex direction="column" gap="4">
        <EmployeeTableHeader totalCount={employees.totalCount} />

        <EmployeeFilters
          search={search}
          position={position}
          positions={positions}
          onUpdateParam={updateParam}
        />

        <EmployeeDesktopTable
          employees={employees.data}
          getSalaryColor={getSalaryColor}
        />

        <EmployeeMobileCards
          employees={employees.data}
          getSalaryColor={getSalaryColor}
        />

        {employees.totalPages > 1 && (
          <EmployeePagination
            page={page}
            totalPages={employees.totalPages}
            totalCount={employees.totalCount}
            onUpdateParam={updateParam}
          />
        )}
      </Flex>
    </Card>
  );
}

import { getEmployeeKpis } from "@/lib/kpi";
import { Grid, Heading } from "@radix-ui/themes";
import KpiCard from "@/components/KpiCard";
import AgeDistributionChart from "@/components/charts/AgeDistributionChart";
import AvgSalaryChart from "@/components/charts/AvgSalaryChart";
import { getAverageSalaryByPosition } from "@/lib/salary";
import { getAgeDistribution } from "@/lib/age";
import { getEmployees } from "@/lib/employees";
import { getPositions } from "@/lib/positions";
import EmployeeTable from "@/components/table/EmployeeTable";
import { Suspense } from "react";

type SearchParams = {
  page?: string;
  position?: string;
  search?: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const position = params.position;
  const search = params.search;

  const [kpi, avgSalaryData, ageDistributionData, employees, positions] =
    await Promise.all([
      getEmployeeKpis(),
      getAverageSalaryByPosition(),
      getAgeDistribution(),
      getEmployees({ page, pageSize: 10, position, search }),
      getPositions(),
    ]);

  return (
    <main>
      <Heading size="6" mb="4">
        Employee Dashboard
      </Heading>

      <Grid columns={{ initial: "2", md: "3", lg: "5" }} gap="4">
        <KpiCard
          title="Total Employee"
          value={kpi.totalEmployee.toLocaleString("id-ID")}
          icon="users"
          color="blue"
          trend="up"
          trendValue="+8.2%"
          subtitle="vs last month"
        />

        <KpiCard
          title="Average Age"
          value={`${kpi.averageAge} yrs`}
          icon="calendar"
          color="purple"
          subtitle="median age"
        />

        <KpiCard
          title="Average Salary"
          value={`Rp ${kpi.averageSalary.toLocaleString("id-ID")}`}
          icon="dollar"
          color="green"
          trend="up"
          trendValue="+5.3%"
          subtitle="per month"
        />

        <KpiCard
          title="Highest Salary"
          value={`Rp ${kpi.highestSalary.toLocaleString("id-ID")}`}
          icon="award"
          color="orange"
          subtitle="top earner"
        />

        <KpiCard
          title="Most Common Position"
          value={kpi.mostCommonPosition}
          icon="briefcase"
          color="cyan"
          subtitle="328 employees"
        />
      </Grid>

      <Grid
        columns={{ initial: "1", lg: "2" }}
        gap="4"
        style={{ marginTop: "1.5rem" }}
      >
        <AgeDistributionChart data={ageDistributionData} />
        <AvgSalaryChart data={avgSalaryData} />
      </Grid>

      <EmployeeTable
        employees={employees}
        positions={positions}
        selectedPosition={position}
      />
    </main>
  );
}

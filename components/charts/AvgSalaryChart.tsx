"use client";

import { Card, Flex, Text, Badge } from "@radix-ui/themes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";
import { TrendingUp, DollarSign } from "lucide-react";
import { SalaryTooltip } from "./tooltips/SalaryTooltip";

interface AvgSalaryData {
  position: string;
  avgSalary: number;
}

interface AvgSalaryChartProps {
  data: AvgSalaryData[];
}

export default function AvgSalaryChart({ data }: AvgSalaryChartProps) {
  const sortedData = [...data].sort((a, b) => b.avgSalary - a.avgSalary);

  const enrichedData = sortedData.map((item, index) => ({
    ...item,
    isHighest: index === 0,
    isLowest: index === sortedData.length - 1,
  }));

  const getColor = (isHighest: boolean, isLowest: boolean) => {
    if (isHighest) return "var(--green-9)";
    if (isLowest) return "var(--blue-9)";
    return "var(--purple-9)";
  };

  const avgOfAvg =
    sortedData.reduce((sum, item) => sum + item.avgSalary, 0) /
    sortedData.length;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <Card size="2">
      <Flex direction="column" gap="4">
        {/* HEADER */}
        <Flex justify="between" align="start" wrap="wrap" gap="3">
          <Flex direction="column" gap="1">
            <Flex align="center" gap="2">
              <div
                className="w-8 h-8 sm:w-9 sm:h-9"
                style={{
                  borderRadius: "var(--radius-2)",
                  background: "var(--green-a3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--green-11)",
                }}
              >
                <DollarSign className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </div>

              <Text className="text-sm sm:text-base" weight="bold">
                Average Salary by Position
              </Text>
            </Flex>

            <Text
              className="text-[11px] sm:text-xs"
              style={{ color: "var(--gray-a11)", paddingLeft: "40px" }}
            >
              Ranking based on compensation
            </Text>
          </Flex>

          <Flex gap="2" wrap="wrap">
            <Badge color="green" size="1" radius="full">
              <Flex align="center" gap="1">
                <TrendingUp size={12} />
                Rp {(avgOfAvg / 1_000_000).toFixed(1)}m
              </Flex>
            </Badge>

            <Badge color="purple" size="1" radius="full" variant="soft">
              {sortedData.length} Positions
            </Badge>
          </Flex>
        </Flex>

        {/* CHART */}
        <ResponsiveContainer width="100%" height={isMobile ? 260 : 360}>
          <BarChart
            data={enrichedData}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-a4)" />

            <XAxis
              type="number"
              tick={{ fill: "var(--gray-a11)", fontSize: isMobile ? 10 : 11 }}
              tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}m`}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              dataKey="position"
              type="category"
              width={isMobile ? 90 : 140}
              tick={{
                fill: "var(--gray-a11)",
                fontSize: isMobile ? 10 : 11,
              }}
              tickFormatter={(v: string) =>
                isMobile && v.length > 10 ? v.slice(0, 10) + "…" : v
              }
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              content={<SalaryTooltip />}
              cursor={{ fill: "var(--green-a2)" }}
            />

            <Bar
              dataKey="avgSalary"
              radius={[0, 6, 6, 0]}
              maxBarSize={isMobile ? 26 : 34}
            >
              {enrichedData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={getColor(entry.isHighest, entry.isLowest)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* LEGEND */}
        <Flex gap="3" wrap="wrap">
          {[
            ["var(--green-9)", "Highest"],
            ["var(--purple-9)", "Mid-range"],
            ["var(--blue-9)", "Lowest"],
          ].map(([color, label]) => (
            <Flex key={label} align="center" gap="2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ background: color }}
              />
              <Text
                className="text-[11px] sm:text-xs"
                style={{ color: "var(--gray-a11)" }}
              >
                {label}
              </Text>
            </Flex>
          ))}
        </Flex>

        <Text
          className="text-[11px] sm:text-xs"
          style={{ color: "var(--gray-a10)" }}
        >
          💡 Sorted from highest to lowest salary for easier analysis
        </Text>
      </Flex>
    </Card>
  );
}

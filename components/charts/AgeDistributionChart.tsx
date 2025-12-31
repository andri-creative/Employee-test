"use client";

import { Card, Flex, Text, Badge } from "@radix-ui/themes";
import { useEffect, useState } from "react";
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
import { Users } from "lucide-react";
import { AgeTooltip } from "./tooltips/AgeTooltip";

interface AgeDistributionData {
  ageRange: string;
  total: number;
}

interface AgeDistributionChartProps {
  data: AgeDistributionData[];
}

export default function AgeDistributionChart({
  data,
}: AgeDistributionChartProps) {
  const totalEmployees = data.reduce((sum, item) => sum + item.total, 0);

  const enrichedData = data.map((item) => ({
    ...item,
    percentage: ((item.total / totalEmployees) * 100).toFixed(1),
  }));

  const getColor = (index: number) => {
    const colors = [
      "var(--blue-9)",
      "var(--cyan-9)",
      "var(--purple-9)",
      "var(--orange-9)",
    ];
    return colors[index % colors.length];
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
                  background: "var(--blue-a3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--blue-11)",
                }}
              >
                <Users className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </div>

              <Text className="text-sm sm:text-base" weight="bold">
                Employee Age Distribution
              </Text>
            </Flex>

            <Text
              className="text-[11px] sm:text-xs"
              style={{ color: "var(--gray-a11)", paddingLeft: "40px" }}
            >
              Composition based on age ranges
            </Text>
          </Flex>

          <Flex gap="2" wrap="wrap">
            <Badge color="blue" size="1" radius="full">
              <Flex align="center" gap="1">
                <Users size={12} />
                {totalEmployees}
              </Flex>
            </Badge>

            <Badge color="purple" size="1" radius="full" variant="soft">
              {enrichedData.length} Ranges
            </Badge>
          </Flex>
        </Flex>

        {/* CHART */}
        <ResponsiveContainer width="100%" height={isMobile ? 260 : 360}>
          <BarChart
            data={enrichedData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-a4)" />

            <XAxis
              dataKey="ageRange"
              tick={{ fill: "var(--gray-a11)", fontSize: 10 }}
              axisLine={{ stroke: "var(--gray-a6)" }}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "var(--gray-a11)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              hide={window.innerWidth < 640}
            />

            <Tooltip
              content={<AgeTooltip />}
              cursor={{ fill: "var(--blue-a2)" }}
            />

            <Bar dataKey="total" radius={[6, 6, 0, 0]} maxBarSize={48}>
              {enrichedData.map((_, index) => (
                <Cell key={index} fill={getColor(index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* FOOTNOTE */}
        <Text
          className="text-[11px] sm:text-xs"
          style={{ color: "var(--gray-a10)" }}
        >
          💡 Most employees are within the productive age range
        </Text>
      </Flex>
    </Card>
  );
}

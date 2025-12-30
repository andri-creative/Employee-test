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

  return (
    <Card size="3">
      <Flex direction="column" gap="4">
        <Flex justify="between" align="start" wrap="wrap" gap="3">
          <Flex direction="column" gap="1">
            <Flex align="center" gap="2">
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "var(--radius-2)",
                  background: "var(--blue-a3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--blue-11)",
                }}
              >
                <Users size={18} />
              </div>
              <Text size={{ initial: "3", sm: "4" }} weight="bold">
                Distribusi Usia Karyawan
              </Text>
            </Flex>
            <Text
              size={{ initial: "1", sm: "2" }}
              style={{ color: "var(--gray-a11)", paddingLeft: "44px" }}
            >
              Komposisi berdasarkan rentang usia
            </Text>
          </Flex>
          <Flex gap="2" wrap="wrap">
            <Badge color="blue" size="2" radius="full">
              <Flex align="center" gap="1">
                <Users size={12} />
                {totalEmployees} Total
              </Flex>
            </Badge>
            <Badge color="purple" size="2" radius="full" variant="soft">
              {enrichedData.length} Rentang
            </Badge>
          </Flex>
        </Flex>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={enrichedData}
            margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-a4)" />
            <XAxis
              dataKey="ageRange"
              tick={{ fill: "var(--gray-a11)", fontSize: 12 }}
              axisLine={{ stroke: "var(--gray-a6)" }}
              tickLine={{ stroke: "var(--gray-a6)" }}
            />
            <YAxis
              tick={{ fill: "var(--gray-a11)", fontSize: 12 }}
              axisLine={{ stroke: "var(--gray-a6)" }}
              tickLine={{ stroke: "var(--gray-a6)" }}
              label={{
                value: "Jumlah Karyawan",
                angle: -90,
                position: "insideLeft",
                style: { fill: "var(--gray-a11)", fontSize: 11 },
              }}
            />
            <Tooltip
              content={<AgeTooltip />}
              cursor={{ fill: "var(--blue-a2)" }}
            />
            <Bar dataKey="total" radius={[8, 8, 0, 0]} maxBarSize={80}>
              {enrichedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <Flex gap="2" wrap="wrap" style={{ paddingTop: "0.5rem" }}>
          <Text size="1" style={{ color: "var(--gray-a10)" }}>
            💡 Mayoritas karyawan berada di rentang usia produktif
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}

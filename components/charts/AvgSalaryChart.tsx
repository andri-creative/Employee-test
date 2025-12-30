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
  // Sort data dari tertinggi ke terendah
  const sortedData = [...data].sort((a, b) => b.avgSalary - a.avgSalary);

  // Tandai highest dan lowest
  const enrichedData = sortedData.map((item, index) => ({
    ...item,
    isHighest: index === 0,
    isLowest: index === sortedData.length - 1,
    displaySalary: `Rp ${(item.avgSalary / 1000000).toFixed(1)}jt`,
  }));

  // Warna berdasarkan ranking
  const getColor = (isHighest: boolean, isLowest: boolean) => {
    if (isHighest) return "var(--green-9)";
    if (isLowest) return "var(--blue-9)";
    return "var(--purple-9)";
  };

  const avgOfAvg =
    sortedData.reduce((sum, item) => sum + item.avgSalary, 0) /
    sortedData.length;

  // 🎯 FITUR BAGUS 1: Hitung tinggi secara dinamis TAPI dengan batasan
  const calculateChartHeight = () => {
    const baseHeight = 320; // Sama dengan chart sebelah
    const dynamicHeight = sortedData.length * 50; // 50px per bar

    // Berikan batasan maksimal agar tidak terlalu tinggi
    const maxHeight = 450; // Max 450px

    if (dynamicHeight > maxHeight) {
      // Jika terlalu banyak data, gunakan scroll internal
      return maxHeight;
    }

    // Jika sedikit data, tinggi minimal sama dengan chart sebelah
    return Math.max(baseHeight, dynamicHeight);
  };

  // 🎯 FITUR BAGUS 2: Hitung width Y-axis berdasarkan panjang teks
  const calculateYAxisWidth = () => {
    const maxLength = Math.max(
      ...sortedData.map((item) => item.position.length)
    );
    // Hitung width: minimal 140px, maksimal 200px, sesuaikan dengan panjang teks
    return Math.min(Math.max(maxLength * 8, 140), 200);
  };

  // 🎯 FITUR BAGUS 3: Adjust font size jika ada banyak data
  const getFontSize = () => {
    if (sortedData.length > 7) return 10; // Font lebih kecil untuk banyak data
    return 11; // Font normal
  };

  const chartHeight = calculateChartHeight();
  const yAxisWidth = calculateYAxisWidth();
  const fontSize = getFontSize();

  return (
    <Card size="3" style={{ height: "100%" }}>
      <Flex direction="column" gap="4" style={{ height: "100%" }}>
        <Flex justify="between" align="start" wrap="wrap" gap="3">
          <Flex direction="column" gap="1">
            <Flex align="center" gap="2">
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "var(--radius-2)",
                  background: "var(--green-a3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--green-11)",
                }}
              >
                <DollarSign size={18} />
              </div>
              <Text size={{ initial: "3", sm: "4" }} weight="bold">
                Rata-rata Gaji per Posisi
              </Text>
            </Flex>
            <Text
              size={{ initial: "1", sm: "2" }}
              style={{ color: "var(--gray-a11)", paddingLeft: "44px" }}
            >
              Ranking berdasarkan kompensasi
            </Text>
          </Flex>
          <Flex gap="2" wrap="wrap">
            <Badge color="green" size="2" radius="full">
              <Flex align="center" gap="1">
                <TrendingUp size={12} />
                Rp {(avgOfAvg / 1000000).toFixed(1)}jt Avg
              </Flex>
            </Badge>
            <Badge color="purple" size="2" radius="full" variant="soft">
              {sortedData.length} Posisi
            </Badge>
          </Flex>
        </Flex>

        {/* 🎯 ResponsiveContainer dengan tinggi yang dihitung secara cerdas */}
        <div style={{ flex: 1, minHeight: "320px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={enrichedData}
              layout="vertical"
              margin={{
                top: sortedData.length > 7 ? 10 : 5,
                right: 30,
                left: 10,
                bottom: sortedData.length > 7 ? 20 : 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-a4)" />
              <XAxis
                type="number"
                tick={{ fill: "var(--gray-a11)", fontSize: 11 }}
                axisLine={{ stroke: "var(--gray-a6)" }}
                tickLine={{ stroke: "var(--gray-a6)" }}
                tickFormatter={(value) => `${(value / 1000000).toFixed(0)}jt`}
              />
              <YAxis
                dataKey="position"
                type="category"
                width={100}
                angle={0}
                textAnchor="end"
                tick={{
                  fill: "var(--gray-a11)",
                  fontSize: fontSize,
                }}
                tickFormatter={(value: string) =>
                  value.length > 12 ? value.slice(0, 12) + "…" : value
                }
                axisLine={{ stroke: "var(--gray-a6)" }}
                tickLine={{ stroke: "var(--gray-a6)" }}
              />

              <Tooltip
                content={<SalaryTooltip />}
                cursor={{ fill: "var(--green-a2)" }}
              />
              <Bar dataKey="avgSalary" radius={[0, 8, 8, 0]} maxBarSize={35}>
                {enrichedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getColor(entry.isHighest, entry.isLowest)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <Flex direction="column" gap="2" style={{ paddingTop: "0.5rem" }}>
          <Flex gap="3" wrap="wrap">
            <Flex align="center" gap="2">
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "2px",
                  background: "var(--green-9)",
                }}
              />
              <Text size="1" style={{ color: "var(--gray-a11)" }}>
                Tertinggi
              </Text>
            </Flex>
            <Flex align="center" gap="2">
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "2px",
                  background: "var(--purple-9)",
                }}
              />
              <Text size="1" style={{ color: "var(--gray-a11)" }}>
                Menengah
              </Text>
            </Flex>
            <Flex align="center" gap="2">
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "2px",
                  background: "var(--blue-9)",
                }}
              />
              <Text size="1" style={{ color: "var(--gray-a11)" }}>
                Terendah
              </Text>
            </Flex>
          </Flex>
          <Text size="1" style={{ color: "var(--gray-a10)" }}>
            💡 Chart diurutkan dari gaji tertinggi ke terendah untuk memudahkan
            analisa kompensasi
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}

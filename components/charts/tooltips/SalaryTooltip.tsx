import { Card, Flex, Text, Badge } from "@radix-ui/themes";

interface SalaryTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      position: string;
      avgSalary: number;
      isHighest?: boolean;
      isLowest?: boolean;
    };
    fill: string;
  }>;
}

export function SalaryTooltip({ active, payload }: SalaryTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Card size="2" style={{ padding: "0.75rem", minWidth: "200px" }}>
        <Flex direction="column" gap="2">
          <Flex align="center" gap="2">
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "3px",
                background: payload[0].fill,
              }}
            />
            <Text size="2" weight="bold">
              {data.position}
            </Text>
          </Flex>
          <Flex direction="column" gap="1">
            <Text size="1" style={{ color: "var(--gray-a11)" }}>
              Rata-rata Gaji
            </Text>
            <Text size="3" weight="bold" style={{ color: "var(--green-11)" }}>
              Rp {data.avgSalary.toLocaleString("id-ID")}
            </Text>
            {data.isHighest && (
              <Badge color="orange" size="1" style={{ width: "fit-content" }}>
                Gaji Tertinggi
              </Badge>
            )}
            {data.isLowest && (
              <Badge color="blue" size="1" style={{ width: "fit-content" }}>
                Gaji Terendah
              </Badge>
            )}
          </Flex>
        </Flex>
      </Card>
    );
  }
  return null;
}

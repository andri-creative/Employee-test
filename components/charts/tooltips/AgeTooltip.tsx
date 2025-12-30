import { Card, Flex, Text } from "@radix-ui/themes";

interface AgeTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      ageRange: string;
      total: number;
      percentage: string;
    };
    fill: string;
  }>;
}

export function AgeTooltip({ active, payload }: AgeTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Card size="2" style={{ padding: "0.75rem", minWidth: "180px" }}>
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
              {data.ageRange} Tahun
            </Text>
          </Flex>
          <Flex direction="column" gap="1">
            <Text size="1" style={{ color: "var(--gray-a11)" }}>
              Total Karyawan
            </Text>
            <Text size="3" weight="bold" style={{ color: "var(--blue-11)" }}>
              {data.total} orang
            </Text>
            <Text size="1" style={{ color: "var(--gray-a10)" }}>
              {data.percentage}% dari total
            </Text>
          </Flex>
        </Flex>
      </Card>
    );
  }
  return null;
}

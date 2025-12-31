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
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <Card
      size="1"
      className="max-w-[160px] sm:max-w-[200px]"
      style={{ padding: "0.5rem" }}
    >
      <Flex direction="column" gap="2">
        <Flex align="center" gap="2">
          <div
            className="w-2.5 h-2.5 rounded-sm"
            style={{ background: payload[0].fill }}
          />
          <Text className="text-xs sm:text-sm" weight="bold">
            {data.ageRange} Years
          </Text>
        </Flex>

        <Flex direction="column" gap="1">
          <Text
            className="text-[11px] sm:text-xs"
            style={{ color: "var(--gray-a11)" }}
          >
            Total Employees
          </Text>

          <Text
            className="text-sm sm:text-base"
            weight="bold"
            style={{ color: "var(--blue-11)" }}
          >
            {data.total} people
          </Text>

          <Text
            className="text-[10px] sm:text-xs"
            style={{ color: "var(--gray-a10)" }}
          >
            {data.percentage}% of total
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}

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
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <Card
      size="1"
      className="max-w-[180px] sm:max-w-[240px]"
      style={{ padding: "0.5rem" }}
    >
      <Flex direction="column" gap="2">
        <Flex align="center" gap="2">
          <div
            className="w-2.5 h-2.5 rounded-sm"
            style={{ background: payload[0].fill }}
          />
          <Text className="text-xs sm:text-sm" weight="bold">
            {data.position}
          </Text>
        </Flex>

        <Flex direction="column" gap="1">
          <Text
            className="text-[11px] sm:text-xs"
            style={{ color: "var(--gray-a11)" }}
          >
            Average Salary
          </Text>

          <Text
            className="text-sm sm:text-base"
            weight="bold"
            style={{ color: "var(--green-11)" }}
          >
            IDR {data.avgSalary.toLocaleString("id-ID")}
          </Text>

          <Flex gap="1" wrap="wrap">
            {data.isHighest && (
              <Badge color="orange" size="1">
                Highest
              </Badge>
            )}
            {data.isLowest && (
              <Badge color="blue" size="1">
                Lowest
              </Badge>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}

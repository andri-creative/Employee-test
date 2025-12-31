import { Flex, Text, Badge } from "@radix-ui/themes";
import { Users } from "lucide-react";

interface EmployeeTableHeaderProps {
  totalCount: number;
}

export function EmployeeTableHeader({ totalCount }: EmployeeTableHeaderProps) {
  return (
    <Flex justify="between" align="center" wrap="wrap" gap="3">
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
            Employee Data
          </Text>
        </Flex>
        <Text
          size={{ initial: "1", sm: "2" }}
          style={{ color: "var(--gray-a11)", paddingLeft: "44px" }}
        >
          Manage and filter employee data
        </Text>
      </Flex>

      <Flex gap="2" wrap="wrap">
        <Badge color="blue" size="2" radius="full">
          <Flex align="center" gap="1">
            <Users size={12} />
            {totalCount} Total
          </Flex>
        </Badge>
      </Flex>
    </Flex>
  );
}

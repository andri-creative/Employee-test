import { Card, Flex, Text, Badge } from "@radix-ui/themes";

interface Employee {
  id: string;
  name: string;
  age: number;
  position: string;
  salary: number;
}

interface EmployeeMobileCardsProps {
  employees: Employee[];
  getSalaryColor: (salary: number) => string;
}

export function EmployeeMobileCards({
  employees,
  getSalaryColor,
}: EmployeeMobileCardsProps) {
  const getValidColor = (color: string): "green" | "blue" | "gray" => {
    if (color === "green") return "green";
    if (color === "blue") return "blue";
    return "gray";
  };

  return (
    <Flex direction="column" gap="3" className="mobile-cards">
      {employees.length === 0 ? (
        <Card>
          <Flex justify="center" py="5">
            <Text size="2" color="gray">
              Tidak ada data yang ditemukan
            </Text>
          </Flex>
        </Card>
      ) : (
        employees.map((emp) => (
          <Card key={emp.id} size="2">
            <Flex direction="column" gap="3">
              <Flex justify="between" align="start">
                <Flex direction="column" gap="1">
                  <Text size="3" weight="bold">
                    {emp.name}
                  </Text>
                  <Badge color="blue" variant="soft" size="1">
                    {emp.position}
                  </Badge>
                </Flex>
                <Badge color="gray" variant="soft" radius="full" size="1">
                  {emp.age} tahun
                </Badge>
              </Flex>

              <Flex justify="between" align="center">
                <Text size="1" style={{ color: "var(--gray-a11)" }}>
                  Gaji
                </Text>
                <Badge
                  color={getValidColor(getSalaryColor(emp.salary))}
                  variant="soft"
                  size="2"
                >
                  Rp {emp.salary.toLocaleString("id-ID")}
                </Badge>
              </Flex>
            </Flex>
          </Card>
        ))
      )}
    </Flex>
  );
}

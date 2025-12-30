import { ScrollArea, Table, Flex, Text, Badge } from "@radix-ui/themes";

interface Employee {
  id: string;
  name: string;
  age: number;
  position: string;
  salary: number;
}

interface EmployeeDesktopTableProps {
  employees: Employee[];
  getSalaryColor: (salary: number) => string;
}

export function EmployeeDesktopTable({
  employees,
  getSalaryColor,
}: EmployeeDesktopTableProps) {
  const getValidColor = (color: string): "green" | "blue" | "gray" => {
    if (color === "green") return "green";
    if (color === "blue") return "blue";
    return "gray";
  };

  return (
    <div style={{ display: "none" }} className="desktop-table">
      <style>{`
        @media (min-width: 768px) {
          .desktop-table {
            display: block !important;
          }
          .mobile-cards {
            display: none !important;
          }
        }
      `}</style>

      <ScrollArea>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Age</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Position</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Salary</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {employees.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={4}>
                  <Flex justify="center" py="5">
                    <Text size="2" color="gray">
                      Tidak ada data yang ditemukan
                    </Text>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ) : (
              employees.map((emp) => (
                <Table.Row key={emp.id}>
                  <Table.Cell>
                    <Text weight="medium">{emp.name}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color="gray" variant="soft" radius="full">
                      {emp.age} tahun
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color="blue" variant="soft">
                      {emp.position}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      color={getValidColor(getSalaryColor(emp.salary))}
                      variant="soft"
                    >
                      Rp {emp.salary.toLocaleString("id-ID")}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      </ScrollArea>
    </div>
  );
}

import { useState } from "react";
import { Flex, Text, TextField, Select, Button } from "@radix-ui/themes";
import { Search, Filter } from "lucide-react";

interface EmployeeFiltersProps {
  search: string;
  position: string;
  positions: string[];
  onUpdateParam: (key: string, value?: string, resetPage?: boolean) => void;
}

export function EmployeeFilters({
  search,
  position,
  positions,
  onUpdateParam,
}: EmployeeFiltersProps) {
  const hasActiveFilters = search || position !== "all";

  const handleClearFilters = () => {
    onUpdateParam("search", undefined, true);
    onUpdateParam("position", "all", true);
    onUpdateParam("page", "1");
  };

  return (
    <Flex gap="3" wrap="wrap" align="end">
      {/* Search Input */}
      <Flex direction="column" gap="1" style={{ flex: "1", minWidth: "200px" }}>
        <Text size="1" weight="medium" style={{ color: "var(--gray-a11)" }}>
          Search
        </Text>
        <TextField.Root
          placeholder="Cari nama karyawan..."
          value={search}
          onChange={(e) =>
            onUpdateParam("search", e.target.value || undefined, true)
          }
          size="2"
        >
          <TextField.Slot>
            <Search size={14} />
          </TextField.Slot>
        </TextField.Root>
      </Flex>

      {/* Position Filter */}
      <Flex direction="column" gap="1" style={{ minWidth: "180px" }}>
        <Text size="1" weight="medium" style={{ color: "var(--gray-a11)" }}>
          Position
        </Text>
        <Select.Root
          value={position}
          onValueChange={(value) =>
            onUpdateParam("position", value === "all" ? undefined : value, true)
          }
          size="2"
        >
          <Select.Trigger placeholder="Filter posisi" style={{ width: "100%" }}>
            <Flex align="center" gap="1">
              <Filter size={14} />
              {position === "all" ? "Semua Posisi" : position}
            </Flex>
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all">Semua Posisi</Select.Item>
            {positions.map((pos) => (
              <Select.Item key={pos} value={pos}>
                {pos}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          variant="soft"
          color="gray"
          size="2"
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>
      )}
    </Flex>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { Flex, Text, TextField, Select, Button } from "@radix-ui/themes";
import { Search, Filter, X } from "lucide-react";

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
  const [searchInput, setSearchInput] = useState(search);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const hasActiveFilters = search || position !== "all";

  // Debounced search - tunggu 500ms setelah user berhenti mengetik
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (searchInput !== search) {
        onUpdateParam("search", searchInput || undefined, true);
      }
    }, 500); // Delay 500ms

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchInput]);

  // Sync dengan URL saat halaman load
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const handleClearFilters = () => {
    setSearchInput("");
    onUpdateParam("search", undefined, true);
    onUpdateParam("position", "all", true);
    onUpdateParam("page", "1");
  };

  const handlePositionChange = (value: string) => {
    onUpdateParam("position", value === "all" ? undefined : value, true);
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
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          size="2"
        >
          <TextField.Slot>
            <Search size={14} />
          </TextField.Slot>
          {searchInput && (
            <TextField.Slot>
              <X
                size={14}
                style={{ cursor: "pointer" }}
                onClick={() => setSearchInput("")}
              />
            </TextField.Slot>
          )}
        </TextField.Root>
      </Flex>

      {/* Position Filter */}
      <Flex direction="column" gap="1" style={{ minWidth: "180px" }}>
        <Text size="1" weight="medium" style={{ color: "var(--gray-a11)" }}>
          Position
        </Text>
        <Select.Root
          value={position}
          onValueChange={handlePositionChange}
          size="2"
        >
          <Select.Trigger placeholder="Filter posisi" style={{ width: "100%" }}>
            <Flex align="center" gap="1">
              <Filter size={14} />
              {position === "all" ? "All Positions" : position}
            </Flex>
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all">All Positions</Select.Item>
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

"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Box, Flex, Text, IconButton, Avatar } from "@radix-ui/themes";
import { Menu, X, ChevronLeft, ChevronRight, Search, Bell } from "lucide-react";

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export function Header({
  isSidebarOpen,
  setIsSidebarOpen,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: HeaderProps) {
  return (
    <Box
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "64px",
        backgroundColor: "var(--color-background)",
        borderBottom: "1px solid var(--gray-5)",
        zIndex: 50,
      }}
    >
      <Flex
        align="center"
        justify="between"
        style={{ height: "100%", padding: "0 1rem" }}
      >
        <Flex align="center" gap="3">
          {/* Mobile Menu Toggle */}
          <IconButton
            variant="ghost"
            size="3"
            className="mobile-only"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </IconButton>

          {/* Desktop Sidebar Toggle */}
          <IconButton
            variant="ghost"
            size="2"
            className="desktop-only"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </IconButton>

          <Text size="5" weight="bold" style={{ color: "var(--accent-9)" }}>
            MyApp
          </Text>
        </Flex>

        <Flex align="center" gap="3">
          <IconButton variant="ghost" size="2">
            <Search size={20} />
          </IconButton>
          <IconButton variant="ghost" size="2">
            <Bell size={20} />
          </IconButton>
          <Avatar
            size="2"
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=100"
            fallback="U"
            radius="full"
          />
        </Flex>
      </Flex>
    </Box>
  );
}

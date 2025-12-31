"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Avatar,
  Badge,
  Separator,
  Button,
} from "@radix-ui/themes";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  User,
} from "lucide-react";

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
  const [darkMode, setDarkMode] = React.useState(false);
  const [hasNotifications, setHasNotifications] = React.useState(true);

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
        backdropFilter: "blur(8px)",
        zIndex: 50,
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Flex
        align="center"
        justify="between"
        style={{ height: "100%", padding: "0 1.5rem" }}
      >
        {/* Left Section */}
        <Flex align="center" gap="4">
          {/* Mobile Menu Toggle */}
          <IconButton
            variant="soft"
            size="2"
            radius="full"
            className="mobile-only"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </IconButton>

          {/* Desktop Sidebar Toggle */}
          <IconButton
            variant="soft"
            size="2"
            radius="full"
            className="desktop-only"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <ChevronLeft size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </IconButton>

          {/* Logo & App Name */}
          <Flex align="center" gap="2">
            <Box
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background:
                  "linear-gradient(135deg, var(--accent-9), var(--accent-11))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text size="2" weight="bold" style={{ color: "white" }}>
                M
              </Text>
            </Box>
            <Flex direction="column">
              <Text size="4" weight="bold" style={{ color: "var(--gray-12)" }}>
                MyApp
              </Text>
              <Text size="1" style={{ color: "var(--gray-10)" }}>
                Employee Management
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {/* Center Section - Search Bar (Desktop only) */}
        <Box
          className="desktop-only"
          style={{ flex: 1, maxWidth: "400px", margin: "0 2rem" }}
        >
          <Flex
            align="center"
            gap="2"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              background: "var(--gray-2)",
              border: "1px solid var(--gray-5)",
            }}
          >
            <Search size={16} color="var(--gray-10)" />
            <input
              type="text"
              placeholder="Search employees, departments..."
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "14px",
                color: "var(--gray-12)",
              }}
            />
            <Text
              size="1"
              style={{ color: "var(--gray-9)", fontFamily: "monospace" }}
            >
              ⌘K
            </Text>
          </Flex>
        </Box>

        {/* Right Section */}
        <Flex align="center" gap="3">
          {/* Notifications */}
          <Box position="relative">
            <IconButton
              variant="ghost"
              size="2"
              radius="full"
              onClick={() => setHasNotifications(false)}
            >
              {hasNotifications && (
                <Box
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "var(--red-9)",
                    border: "2px solid var(--color-background)",
                  }}
                />
              )}
              <Bell size={18} />
            </IconButton>
          </Box>

          <Separator orientation="vertical" style={{ height: "24px" }} />

          {/* User Profile */}
          <Flex align="center" gap="2">
            <Avatar
              size="2"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              fallback="JD"
              radius="full"
              style={{
                border: "2px solid var(--accent-a6)",
                cursor: "pointer",
              }}
            />
            <Box className="desktop-only">
              <Flex direction="column">
                <Text
                  size="2"
                  weight="medium"
                  style={{ color: "var(--gray-12)" }}
                >
                  John Doe
                </Text>
                <Text size="1" style={{ color: "var(--gray-10)" }}>
                  Admin
                </Text>
              </Flex>
            </Box>
            <IconButton variant="ghost" size="1" className="desktop-only">
              <ChevronLeft size={16} style={{ transform: "rotate(-90deg)" }} />
            </IconButton>
          </Flex>
        </Flex>
      </Flex>

      {/* Mobile Search Bar */}
      <Box
        className="mobile-only"
        style={{ padding: "0 1rem", marginTop: "-8px" }}
      >
        <Flex
          align="center"
          gap="2"
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            background: "var(--gray-2)",
            border: "1px solid var(--gray-5)",
          }}
        >
          <Search size={16} color="var(--gray-10)" />
          <input
            type="text"
            placeholder="Search..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: "14px",
              color: "var(--gray-12)",
            }}
          />
        </Flex>
      </Box>
    </Box>
  );
}

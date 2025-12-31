"use client";
import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Flex, Button, Badge, Text } from "@radix-ui/themes";
import { Home, Upload, LucideIcon } from "lucide-react";

interface SidebarProps {
  isSidebarOpen: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
  badge?: string | null;
}

interface MenuContentProps {
  isCollapsed?: boolean;
  onItemClick?: (() => void) | null;
}

export function Sidebar({
  isSidebarOpen,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: SidebarProps) {
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Upload, label: "Upload Employee", path: "/upload-employee" },
  ];

  const MenuContent = ({
    isCollapsed = false,
    onItemClick = null,
  }: MenuContentProps) => (
    <Flex direction="column" justify="between" height="100%" py="3">
      <Flex direction="column" gap="1" px="3">
        {" "}
        {/* Tambahkan padding horizontal di sini */}
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Box
              key={index}
              style={{
                position: "relative",
                marginBottom: "0.25rem", // Spasi antar item
              }}
            >
              {/* Active Indicator - Letakkan di Box luar */}
              {isActive && (
                <Box
                  style={{
                    position: "absolute",
                    left: "-12px", // Tepat di tepi sidebar
                    top: "50%",
                    transform: "translateY(-50%)",
                    height: "24px",
                    width: "4px",
                    borderRadius: "0 4px 4px 0",
                    backgroundColor: "var(--accent-9)",
                    zIndex: 1,
                  }}
                />
              )}

              <Link
                href={item.path}
                onClick={onItemClick ?? undefined}
                style={{
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <Button
                  variant="ghost"
                  size="3"
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem", // Kurangi padding sedikit
                    borderRadius: "8px",
                    cursor: "pointer",
                    justifyContent: isCollapsed ? "center" : "flex-start",
                    backgroundColor: isActive
                      ? "var(--accent-a3)"
                      : "transparent",
                    // Hapus semua margin dari sini
                  }}
                >
                  <Flex align="center" gap="3" width="100%">
                    <Icon
                      size={20}
                      style={{
                        color: isActive ? "var(--accent-11)" : "var(--gray-11)",
                      }}
                    />

                    {!isCollapsed && (
                      <>
                        <Text
                          size="2"
                          weight={isActive ? "bold" : "regular"}
                          style={{
                            color: isActive
                              ? "var(--accent-11)"
                              : "var(--gray-12)",
                          }}
                        >
                          {item.label}
                        </Text>

                        {item.badge && (
                          <Badge color="red" radius="full" size="1">
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </Flex>
                </Button>
              </Link>
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        className="desktop-only"
        style={{
          position: "fixed",
          top: "64px",
          left: 0,
          bottom: 0,
          width: isSidebarOpen ? "260px" : "80px",
          backgroundColor: "var(--color-background)",
          borderRight: "1px solid var(--gray-5)",
          transition: "width 0.25s ease",
          zIndex: 40,
          overflow: "hidden", // Pastikan konten tidak meluber
        }}
      >
        <MenuContent isCollapsed={!isSidebarOpen} />
      </Box>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <Box
            className="mobile-only"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              top: "64px",
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 45,
            }}
          />

          {/* Drawer */}
          <Box
            className="mobile-only"
            style={{
              position: "fixed",
              top: "64px",
              left: 0,
              bottom: 0,
              width: "280px",
              backgroundColor: "var(--color-background)",
              boxShadow: "8px 0 24px rgba(0,0,0,0.2)",
              zIndex: 50,
              animation: "slideIn 0.25s ease-out",
              overflow: "hidden", // Pastikan konten tidak meluber
            }}
          >
            <MenuContent onItemClick={() => setIsMobileMenuOpen(false)} />
          </Box>
        </>
      )}
    </>
  );
}

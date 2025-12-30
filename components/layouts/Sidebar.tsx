"use client";
import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Flex, Button, Badge } from "@radix-ui/themes";
import { Home, LogOut, LucideIcon, Upload } from "lucide-react";

interface SidebarProps {
  isSidebarOpen: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
  badge: string | null;
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
    { icon: Home, label: "Dashboard", path: "/", badge: null },
    {
      icon: Upload,
      label: "Upload File",
      path: "/upload-employee",
      badge: null,
    },
  ];

  const MenuContent = ({
    isCollapsed = false,
    onItemClick = null,
  }: MenuContentProps) => {
    const handleItemClick = () => {
      if (onItemClick) onItemClick();
    };

    return (
      <Flex
        direction="column"
        justify="between"
        style={{ height: "100%", padding: "1rem 0" }}
      >
        <Flex direction="column" gap="1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={index}
                href={item.path}
                style={{ textDecoration: "none" }}
                onClick={handleItemClick}
              >
                <Button
                  variant={isActive ? "soft" : "ghost"}
                  size="3"
                  style={{
                    justifyContent: isCollapsed ? "center" : "flex-start",
                    padding: "0.875rem 1rem",
                    margin: "0 0.5rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                    width: "100%",
                    backgroundColor: isActive ? "var(--accent-3)" : undefined,
                  }}
                >
                  <Flex align="center" gap="3" style={{ width: "100%" }}>
                    <Icon
                      size={20}
                      style={{
                        flexShrink: 0,
                        color: isActive ? "var(--accent-11)" : undefined,
                      }}
                    />
                    {!isCollapsed && (
                      <>
                        <div
                          style={{
                            flex: 1,
                            whiteSpace: "nowrap",
                            color: isActive ? "var(--accent-11)" : undefined,
                          }}
                        >
                          {item.label}
                        </div>
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
            );
          })}
        </Flex>
      </Flex>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        className="desktop-only"
        style={{
          position: "fixed",
          left: 0,
          top: "64px",
          bottom: 0,
          width: isSidebarOpen ? "260px" : "80px",
          backgroundColor: "var(--color-background)",
          borderRight: "1px solid var(--gray-5)",
          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
          zIndex: 40,
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
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 45,
              top: "64px",
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Sidebar */}
          <Box
            className="mobile-only"
            style={{
              position: "fixed",
              left: 0,
              top: "64px",
              bottom: 0,
              width: "280px",
              backgroundColor: "var(--color-background)",
              zIndex: 50,
              boxShadow: "4px 0 12px rgba(0, 0, 0, 0.15)",
              animation: "slideIn 0.3s ease-out",
            }}
          >
            <MenuContent onItemClick={() => setIsMobileMenuOpen(false)} />
          </Box>
        </>
      )}
    </>
  );
}

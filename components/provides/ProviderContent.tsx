"use client";
import React, { useState } from "react";
import { Theme, Box } from "@radix-ui/themes";
import { Header } from "@/components/layouts/Header";
import { Sidebar } from "@/components/layouts/Sidebar";
// import { MainContent } from "@/components/layouts/MainContent";

export default function ProviderContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <Box style={{ minHeight: "100vh", backgroundColor: "var(--gray-1)" }}>
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <Box
        style={{
          transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          marginTop: "64px",
          padding: "1.5rem",
          minHeight: "calc(100vh - 64px)",
        }}
        className={`main-content ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        {children}
      </Box>

      <style>{`
          @keyframes slideIn {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }

          /* Mobile styles (< 768px) */
          @media (max-width: 767px) {
            .mobile-only {
              display: flex !important;
            }
            .desktop-only {
              display: none !important;
            }
            .main-content {
              margin-left: 0 !important;
              padding: 1rem !important;
            }
          }

          /* Desktop styles (>= 768px) */
          @media (min-width: 768px) {
            .mobile-only {
              display: none !important;
            }
            .desktop-only {
              display: block !important;
            }
            .main-content.sidebar-open {
              margin-left: 260px;
            }
            .main-content.sidebar-closed {
              margin-left: 80px;
            }
          }

          /* Tablet optimization (768px - 1024px) */
          @media (min-width: 768px) and (max-width: 1024px) {
            .main-content {
              padding: 1.25rem !important;
            }
          }

          /* Better hover effects */
          button:hover {
            background-color: var(--gray-3);
          }

          /* Smooth transitions */
          * {
            box-sizing: border-box;
          }
        `}</style>
    </Box>
  );
}

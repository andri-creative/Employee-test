import { Flex, Text, IconButton, Button } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface EmployeePaginationProps {
  page: number;
  totalPages: number;
  totalCount: number;
  onUpdateParam: (key: string, value?: string, resetPage?: boolean) => void;
}

export function EmployeePagination({
  page,
  totalPages,
  totalCount,
  onUpdateParam,
}: EmployeePaginationProps) {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Tampilkan semua halaman
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logic untuk ellipsis
      let startPage = Math.max(1, page - 2);
      let endPage = Math.min(totalPages, page + 2);

      if (page <= 3) {
        endPage = maxVisiblePages;
      } else if (page >= totalPages - 2) {
        startPage = totalPages - maxVisiblePages + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <Flex
      justify="between"
      align="center"
      wrap="wrap"
      gap="3"
      style={{
        paddingTop: "0.5rem",
        borderTop: "1px solid var(--gray-a5)",
      }}
    >
      <Text size="2" style={{ color: "var(--gray-a11)" }}>
        Halaman {page} dari {totalPages}
        <Text
          as="span"
          style={{ color: "var(--gray-a9)", marginLeft: "0.5rem" }}
        >
          ({totalCount} total)
        </Text>
      </Text>

      <Flex gap="2">
        <IconButton
          variant="soft"
          disabled={page === 1}
          onClick={() => onUpdateParam("page", String(page - 1))}
          size="2"
        >
          <ChevronLeft size={16} />
        </IconButton>

        {/* Desktop Page Numbers */}
        <Flex
          gap="1"
          style={{ display: "none" }}
          className="desktop-pagination"
        >
          <style>{`
            @media (min-width: 640px) {
              .desktop-pagination {
                display: flex !important;
              }
            }
          `}</style>
          {renderPageNumbers().map((pageNum) => (
            <Button
              key={pageNum}
              variant={page === pageNum ? "solid" : "soft"}
              size="2"
              onClick={() => onUpdateParam("page", String(pageNum))}
              style={{ minWidth: "36px" }}
            >
              {pageNum}
            </Button>
          ))}
        </Flex>

        <IconButton
          variant="soft"
          disabled={page === totalPages}
          onClick={() => onUpdateParam("page", String(page + 1))}
          size="2"
        >
          <ChevronRight size={16} />
        </IconButton>
      </Flex>
    </Flex>
  );
}

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";

type UserPaginationProps = {
  totalPages: number;
};

const CustomPagination: React.FC<UserPaginationProps> = ({ totalPages }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const currentPage = Number(searchParam.get("page")) || 1;

  const updateQuery = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParam.toString());
    if (value) {
      newSearchParams.set(key, value);
    }
    setSearchParam(newSearchParams);
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    updateQuery("page", page.toString());
  };

  const onPreviousPage = () => {
    if (currentPage < 1) return;
    updateQuery("page", (currentPage - 1).toString());
  };
  const onNextPage = () => {
    if (currentPage >= 1 && currentPage <= totalPages) {
      updateQuery("page", (currentPage + 1).toString());
    }
  };

  if (totalPages <= 1) return null;

  return (
    <>
      <div className="mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={onPreviousPage}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                onClick={onNextPage}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default CustomPagination;

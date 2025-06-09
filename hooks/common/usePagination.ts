import { useState } from "react";

export function usePagination() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const nextPage = () => {
    if (page * limit < total) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const resetPagination = () => {
    setPage(1);
    setLimit(10);
    setTotal(0);
  };

  return {
    page,
    limit,
    total,
    setPage,
    setLimit,
    setTotal,
    nextPage,
    prevPage,
    resetPagination,
  };
}

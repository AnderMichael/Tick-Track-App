import { usePagination } from "@/hooks";
import React, { createContext, ReactNode } from "react";

interface PaginationContextProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  resetPagination: () => void;
}

const PaginationContext = createContext<PaginationContextProps | undefined>(
  undefined
);

export const PaginationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { page, setPage, resetPagination } = usePagination();

  return (
    <PaginationContext.Provider
      value={{ currentPage: page, setCurrentPage: setPage, resetPagination }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export const usePaginationContext = (): PaginationContextProps => {
  const context = React.useContext(PaginationContext);
  if (!context) {
    throw new Error(
      "usePaginationContext must be used within a PaginationProvider"
    );
  }
  return context;
};

import { CustomPagination, Screen, StudentsList } from "@/components/common";
import { UPBCodeSearchBar } from "@/components/common/inputs";
import { usePagination } from "@/hooks";
import { useStudents } from "@/hooks/app";
import { useStudentFilter } from "@/hooks/app/useStudentFilter";
import React, { useEffect } from "react";
import { Text } from "react-native";

const StudentsListScreen = () => {
  const { page, setPage, resetPagination, limit } = usePagination();
  const { filters, setFilters } = useStudentFilter();
  const { isLoading, isFetching, refetch, students, total } = useStudents(
    page,
    limit,
    filters
  );

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (students.length === 0 && page > 1) {
      resetPagination();
    }
  }, [students]);

  const handleSearch = (inputValue: string) => {
    const numericText = inputValue.replace(/[^0-9]/g, "");
    if (numericText.length > 7) {
      return;
    }
    setFilters({ ...filters, search: numericText });
    refetch();
  };

  const resetSearch = () => {
    setFilters({ ...filters, search: undefined });
    refetch();
  };

  return (
    <>
      <Screen>
        <UPBCodeSearchBar onSearch={handleSearch} reset={resetSearch} />
        <Screen.Section>
          <Text className="text-base font-outfit-light">
            Mostrando {students.length} de {total}
          </Text>
        </Screen.Section>
        <StudentsList
          students={students}
          isLoading={isLoading || isFetching}
          refetch={refetch}
        />
      </Screen>
      <CustomPagination
        totalItems={total}
        currentPage={page}
        setCurrentPage={setPage}
      />
    </>
  );
};

export default StudentsListScreen;

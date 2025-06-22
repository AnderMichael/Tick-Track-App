import { CustomPagination, Screen, StudentsList } from "@/components/common";
import { usePagination } from "@/hooks";
import { useStudents } from "@/hooks/app";
import { useStudentFilter } from "@/hooks/app/useStudentFilter";
import React, { useEffect } from "react";
import { Text } from "react-native";

const StudentsListScreen = () => {
  const { page, setPage, resetPagination, limit } = usePagination();
  const { filters } = useStudentFilter();
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

  return (
    <>
      <Screen>
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

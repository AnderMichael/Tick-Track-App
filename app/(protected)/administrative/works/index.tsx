import { CustomPagination, Screen, WorksList } from "@/components/common";
import { useSemester } from "@/context/home";
import { usePagination } from "@/hooks";
import { useWorkFilters, useWorks } from "@/hooks/app";
import React, { useEffect } from "react";
import { Text } from "react-native";

const WorksListScreen = () => {
  const { semester } = useSemester();
  const { page, setPage, resetPagination, limit } = usePagination();
  const { workFilters } = useWorkFilters();
  
  const { isLoading, isFetching, refetch, works, total } = useWorks(
    page,
    limit,
    workFilters
  );

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (works.length === 0 && page > 1) {
      resetPagination();
    }
  }, [works]);

  return (
    <>
      <Screen>
        <Screen.Section>
          <Screen.SubTitle>
            Correspondientes al{" "}
            <Text
              className="text-lg font-outfit-medium"
              style={{ color: "black" }}
            >
              {semester!.label}
              {"\n"}
            </Text>
            <Text
              className="text-lg font-outfit-light"
              style={{ color: "black" }}
            >
              Mostrando {works.length} de {total}
            </Text>
          </Screen.SubTitle>
        </Screen.Section>
        <WorksList
          works={works}
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

export default WorksListScreen;

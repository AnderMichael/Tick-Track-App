import {
  CustomPagination,
  ScholarshipOfficersList,
  Screen,
} from "@/components/common";
import { usePagination } from "@/hooks";
import { useScholarshipOfficers } from "@/hooks/app";
import React, { useEffect } from "react";
import { Text } from "react-native";

const ScholarshipOfficersListScreen = () => {
  const { page, setPage, resetPagination, limit } = usePagination();

  const { isLoading, isFetching, refetch, officers, total } =
    useScholarshipOfficers({ page, limit });

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (officers.length === 0 && page > 1) {
      resetPagination();
    }
  }, [officers]);

  return (
    <>
      <Screen>
        <Screen.Section>
          <Text className="text-base font-outfit-light">
            Mostrando {officers.length} de {total}
          </Text>
        </Screen.Section>
        <ScholarshipOfficersList
          officers={officers}
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

export default ScholarshipOfficersListScreen;

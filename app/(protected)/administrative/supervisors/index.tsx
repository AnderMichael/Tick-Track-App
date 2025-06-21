import { CustomPagination, Screen, SupervisorsList } from "@/components/common";
import { usePagination } from "@/hooks";
import { useSupervisors } from "@/hooks/app";
import React, { useEffect } from "react";
import { Text } from "react-native";

const SupervisorsListScreen = () => {
  const { page, setPage, resetPagination, limit } = usePagination();

  const { isLoading, isFetching, refetch, supervisors, total } = useSupervisors(
    page,
    limit
  );

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (supervisors.length === 0 && page > 1) {
      resetPagination();
    }
  }, [supervisors]);

  return (
    <>
      <Screen>
        <Screen.Section>
          <Text className="text-base font-outfit-light">
            Mostrando {supervisors.length} de {total}
          </Text>
        </Screen.Section>
        <SupervisorsList
          supervisors={supervisors}
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

export default SupervisorsListScreen;

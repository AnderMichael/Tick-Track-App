import { CustomPagination, Screen, SupervisorsList } from "@/components/common";
import { UPBCodeSearchBar } from "@/components/common/inputs";
import { usePagination } from "@/hooks";
import { useSupervisors } from "@/hooks/app";
import { useSupervisorFilters } from "@/hooks/app/useSupervisorFilters";
import React, { useEffect } from "react";
import { Text } from "react-native";

const SupervisorsListScreen = () => {
  const { page, setPage, resetPagination, limit } = usePagination();
  const { filters, setFilters } = useSupervisorFilters();
  const { isLoading, isFetching, refetch, supervisors, total } = useSupervisors(
    page,
    limit,
    filters
  );

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (supervisors.length === 0 && page > 1) {
      resetPagination();
    }
  }, [supervisors]);

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

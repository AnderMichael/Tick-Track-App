import {
  CustomPagination,
  ScholarshipOfficersList,
  Screen,
} from "@/components/common";
import { UPBCodeSearchBar } from "@/components/common/inputs";
import { usePagination } from "@/hooks";
import { useScholarshipOfficers } from "@/hooks/app";
import { useScholarshipOfficerFilters } from "@/hooks/app/useScholarshipOfficerFilters";
import React, { useEffect } from "react";
import { Text } from "react-native";

const ScholarshipOfficersListScreen = () => {
  const { page, setPage, resetPagination, limit } = usePagination();
  const { filters, setFilters } = useScholarshipOfficerFilters();
  const { isLoading, isFetching, refetch, officers, total } =
    useScholarshipOfficers({ page, limit, ...filters });

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (officers.length === 0 && page > 1) {
      resetPagination();
    }
  }, [officers]);

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

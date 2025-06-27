import { ScholarshipList } from "@/components/app/administrative";
import { CustomPagination, Screen } from "@/components/common";
import { TextSearchBar } from "@/components/common/inputs";
import { usePagination } from "@/hooks";
import { useScholarships } from "@/hooks/app";
import { RelativePathString, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";

const ScholarshipsListScreen = () => {
  const router = useRouter();
  const { page, setPage, limit, resetPagination } = usePagination();
  const [search, setSearch] = useState<string | undefined>(undefined);
  const { isLoading, isFetching, refetch, scholarships, total } =
    useScholarships({
      page,
      limit,
      search,
    });

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (scholarships.length === 0 && page > 1) {
      resetPagination();
    }
  }, [scholarships]);

  const onEdit = (id: number) => {
    router.push(
      `/(protected)/administrative/scholarships/${id}/edit` as RelativePathString
    );
  };

  const onDelete = (id: number) => {
    router.push(
      `/(protected)/administrative/scholarships/${id}/delete` as RelativePathString
    );
  };

  const navToPercentages = (id: number) => {
    router.push(
      `/(protected)/administrative/scholarships/${id}/percentages` as RelativePathString
    );
  };

  const handleSearch = (inputValue: string) => {
    const onlyText = inputValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, "");
    if (inputValue !== onlyText) {
      setSearch("");
      return;
    }
    if (inputValue.length > 50) {
      return;
    }
    setSearch(onlyText);
    refetch();
  };

  const resetSearch = () => {
    setSearch(undefined);
    refetch();
  };

  return (
    <>
      <Screen>
        <TextSearchBar onSearch={handleSearch} reset={resetSearch} />
        <Screen.Section>
          <Text
            className="text-lg font-outfit-light"
            style={{ color: "black" }}
          >
            Mostrando {scholarships.length} de {total}
          </Text>
        </Screen.Section>
        <ScholarshipList
          onEdit={onEdit}
          onDelete={onDelete}
          onPressPercentages={navToPercentages}
          scholarships={scholarships}
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

export default ScholarshipsListScreen;

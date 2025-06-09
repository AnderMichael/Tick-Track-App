import { CustomPagination, Screen, WorksList } from "@/components/common";
import { useWorkOperationFlow } from "@/context/administrative";
import { useSemester } from "@/context/home";
import { usePagination } from "@/hooks";
import { useWorks } from "@/hooks/app";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { Text } from "react-native";

const WorksListScreen = () => {
  const { semester } = useSemester();
  const { page, setPage, resetPagination, limit } = usePagination();
  const { isLoading, isFetching, refetch, works, total } = useWorks(
    page,
    limit
  );

  const { reloadList, deactivateReloadList } = useWorkOperationFlow();

  useEffect(() => {
    refetch();
  }, [page]);

  useFocusEffect(
    useCallback(() => {
      if (reloadList) {
        refetch();
        deactivateReloadList();
        resetPagination();
      }
    }, [reloadList])
  );

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
              {semester!.label}{'\n'}
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

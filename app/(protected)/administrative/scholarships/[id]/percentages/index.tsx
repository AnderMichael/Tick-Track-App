import { PercentagesList } from "@/components/app/administrative";
import { CustomPagination, Screen } from "@/components/common";
import { usePagination } from "@/hooks";
import { usePercentages } from "@/hooks/app";
import { RelativePathString, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text } from "react-native";

const PercentagesListScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const scholarshipId = parseInt(id as string);

  const {
    percentages,
    isLoading,
    isFetching,
    refetch,
  } = usePercentages(scholarshipId);

  useEffect(() => {
    refetch();
  }, []);

  const onEdit = (detailId: number) => {
    router.push(
      `/(protected)/administrative/scholarships/${scholarshipId}/percentages/${detailId}/edit` as RelativePathString
    );
  };

  const onDelete = (detailId: number) => {
    router.push(
      `/(protected)/administrative/scholarships/${scholarshipId}/percentages/${detailId}/delete` as RelativePathString
    );
  };

  const onCreate = () => {
    router.push(
      `/(protected)/administrative/scholarships/${scholarshipId}/percentages/create` as RelativePathString
    );
  };

  return (
    <>
      <Screen>
        <Screen.Section>
          <Text
            className="text-lg font-outfit-light"
            style={{ color: "black" }}
          >
            Mostrando {percentages.length}
          </Text>
        </Screen.Section>
        <PercentagesList
          percentages={percentages}
          isLoading={isLoading || isFetching}
          onEdit={onEdit}
          onDelete={onDelete}
          onCreate={onCreate}
          refetch={refetch}
        />
      </Screen>
    </>
  );
};

export default PercentagesListScreen;

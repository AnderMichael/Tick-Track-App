import { useGetPercentagesQuery } from "@/store/api/app";

export function usePercentages(scholarshipId: number) {
  const {
    data: percentages = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetPercentagesQuery({ id: scholarshipId });

  return {
    percentages,
    isLoading,
    isFetching,
    error,
    refetch,
  };
}

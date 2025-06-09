import { useSemesterPerYearQuery } from "@/store/api/app";

export function useSemesters(year: number) {
  const {
    data: semesters,
    isLoading: isLoadingSemesters,
    isFetching: isFetchingSemesters,
    isError: isErrorSemesters,
    refetch,
    error: errorSemesters,
  } = useSemesterPerYearQuery({ year });

  return {
    semesters: semesters?.data || [],
    isLoading: isLoadingSemesters || isFetchingSemesters,
    isErrorSemesters,
    refetch,
    errorSemesters,
  };
}

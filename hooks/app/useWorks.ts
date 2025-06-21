import { useSemester } from "@/context/home";
import { WorkFilters } from "@/interfaces/common";
import { useWorksQuery } from "@/store/api/app";

export function useWorks(
  page: number = 1,
  limit: number = 10,
  workFilters: WorkFilters = {}
) {
  const { semester } = useSemester();

  const {
    data: worksList,
    isFetching,
    isLoading,
    refetch,
  } = useWorksQuery({
    administrative_upb_code: workFilters.author,
    semester_id: semester!.value,
    page,
    limit,
  });

  return {
    works: worksList?.data || [],
    total: worksList?.total || 0,
    isFetching,
    isLoading,
    refetch,
  };
}

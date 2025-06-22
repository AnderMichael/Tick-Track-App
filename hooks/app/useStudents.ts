import { useStudentsQuery } from "@/store/api/app";
import { SupervisorFilters } from "@/interfaces/common";

export function useStudents(
  page: number = 1,
  limit: number = 10,
  filters: SupervisorFilters = {}
) {
  const {
    data: studentList,
    isFetching,
    isLoading,
    refetch,
  } = useStudentsQuery({
    department_id: filters.department_id,
    page,
    limit,
  });

  return {
    students: studentList?.data || [],
    total: studentList?.total || 0,
    isFetching,
    isLoading,
    refetch,
  };
}

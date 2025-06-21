import { useSupervisorsQuery } from "@/store/api/app";
import { SupervisorFilters } from "@/interfaces/common";

export function useSupervisors(
  page: number = 1,
  limit: number = 10,
  filters: SupervisorFilters = {}
) {
  const {
    data: supervisorList,
    isFetching,
    isLoading,
    refetch,
  } = useSupervisorsQuery({
    department_id: filters.department_id,
    page,
    limit,
  });

  return {
    supervisors: supervisorList?.data || [],
    total: supervisorList?.total || 0,
    isFetching,
    isLoading,
    refetch,
  };
}

import { useScholarshipOfficersQuery } from "@/store/api/app";

interface UseScholarshipOfficersParams {
  page?: number;
  limit?: number;
  department_id?: number;
  search?: string;
}

export function useScholarshipOfficers({
  page = 1,
  limit = 10,
  department_id,
  search
}: UseScholarshipOfficersParams = {}) {
  const { data, isLoading, isFetching, error, refetch } =
    useScholarshipOfficersQuery({
      page,
      limit,
      department_id,
      search
    });

  return {
    officers: data?.data || [],
    total: data?.total || 0,
    page: data?.page || 1,
    lastPage: data?.lastPage || 1,
    isLoading,
    isFetching,
    error,
    refetch,
  };
}

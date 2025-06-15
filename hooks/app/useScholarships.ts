import { useScholarshipsQuery } from "@/store/api/app";

interface ScholarshipsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export function useScholarships({
  page = 1,
  limit = 10,
  search,
}: ScholarshipsQueryParams = {}) {
  const {
    data: scholarships,
    isFetching,
    isLoading,
    refetch,
  } = useScholarshipsQuery({ page, limit, search });

  return {
    scholarships: scholarships?.data || [],
    total: scholarships?.total || 0,
    isFetching,
    isLoading,
    refetch,
  };
}

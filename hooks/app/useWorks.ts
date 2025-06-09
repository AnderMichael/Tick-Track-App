import { useSemester } from "@/context/home";
import { useWorksQuery } from "@/store/api/app";
import { useSession } from "../common";

export function useWorks(page: number = 1, limit: number = 10) {
    const { user } = useSession();
    const { semester } = useSemester();

    const {
        data: worksList,
        isFetching,
        isLoading,
        refetch,
    } = useWorksQuery({
        administrative_upb_code: user!.upbCode,
        semester_id: semester!.value,
        page,
        limit,
    });
    
    return {
        works: worksList?.data || [],
        total: worksList?.total || 0,
        isFetching,
        isLoading,
        refetch
    };
}
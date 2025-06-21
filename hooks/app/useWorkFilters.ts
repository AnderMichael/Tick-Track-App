import { Role } from "@/constants/common/roles";
import { WorkFilters } from "@/interfaces/common";
import { useEffect, useState } from "react";
import { useSession } from "../common";

export function useWorkFilters() {
  const { user } = useSession();
  const [workFilters, setWorkFilters] = useState<WorkFilters>({});

  useEffect(() => {
    if (!user) return;

    if (user.role === Role.SUPERVISOR) {
      setWorkFilters({ author: user.upbCode });
    } else if (user.role === Role.SCHOLARSHIP_OFFICER) {
      setWorkFilters({ department: user.departmentId });
    } else if (user.role === Role.ADMIN) {
      setWorkFilters({});
    }
  }, [user]);

  return {
    workFilters,
    setWorkFilters,
  };
}

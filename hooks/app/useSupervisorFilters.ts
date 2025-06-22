import { Role } from "@/constants/common/roles";
import { SupervisorFilters } from "@/interfaces/common";
import { useEffect, useState } from "react";
import { useSession } from "../common";

export function useSupervisorFilters() {
  const { user } = useSession();
  const [filters, setFilters] = useState<SupervisorFilters>();

  useEffect(() => {
    if (!user) return;
    if (user.role === Role.SCHOLARSHIP_OFFICER) {
      setFilters({ department_id: user.department_id });
    } else {
      setFilters({});
    }
  }, [user]);

  return {
    filters,
    setFilters,
    roleId: user?.administrative?.utils.supervisorRoleId || 0,
  };
}

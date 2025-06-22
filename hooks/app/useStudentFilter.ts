import { Role } from "@/constants/common/roles";
import { StudentFilters } from "@/interfaces/common";
import { useEffect, useState } from "react";
import { useSession } from "../common";

export function useStudentFilter() {
  const { user } = useSession();
  const [filters, setFilters] = useState<StudentFilters>();

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
    roleId: user?.administrative?.utils.studentRoleId || 0,
  };
}

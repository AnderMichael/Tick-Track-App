import { ScholarshipOfficerFilters } from "@/interfaces/common";
import { useEffect, useState } from "react";
import { useSession } from "../common";

export function useScholarshipOfficerFilters() {
  const { user } = useSession();
  const [filters, setFilters] = useState<ScholarshipOfficerFilters>();

  useEffect(() => {
    if (!user) return;
    setFilters({});
  }, [user]);

  return {
    filters,
    setFilters,
    roleId: user?.administrative?.utils.scholarshipOfficerRoleId || 0,
  };
}

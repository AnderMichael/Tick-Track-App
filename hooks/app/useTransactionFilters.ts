import { Role } from "@/constants/common/roles";
import { useSession } from "../common";
import { useEffect, useState } from "react";
import { TransactionFilters } from "@/interfaces/common";

export function useTransactionFilters() {
  const { user } = useSession();
  const [transactionFilters, setTransactionFilters] = useState<TransactionFilters>({});

  useEffect(() => {
    if (!user) return;

    if (user.role === Role.SUPERVISOR) {
      setTransactionFilters({ administrative_upb_code: user.upbCode });
    } else if (user.role === Role.SCHOLARSHIP_OFFICER) {
      setTransactionFilters({});
    } else if (user.role === Role.ADMIN) {
      setTransactionFilters({});
    }
  }, [user]);

  return {
    transactionFilters,
    setTransactionFilters,
  };
}

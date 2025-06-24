import { useInscriptionsByStudentQuery } from "@/store/api/app";
import { useMemo } from "react";

export const useInscriptions = (year: number, upbCode: number) => {
  const {
    data: inscriptions = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useInscriptionsByStudentQuery(
    { upbCode: upbCode!, year },
    { skip: !upbCode }
  );

  const filteredInscriptions = useMemo(() => {
    return inscriptions.filter((inscription) => {
      const semesterYear = new Date(
        inscription.semester.start_date
      ).getFullYear();
      return semesterYear === year;
    });
  }, [inscriptions, year]);

  return {
    inscriptions: filteredInscriptions,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  };
};

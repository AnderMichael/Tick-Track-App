import {
  CustomPagination,
  Screen,
  WorkTransactionsList,
} from "@/components/common";
import {
  useCurrentWork,
  useTransactionOperationFlow,
} from "@/context/administrative";
import { useSemester } from "@/context/home";
import { usePagination, useSession } from "@/hooks";
import { useTransactions } from "@/hooks/app";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { Text } from "react-native";

export default function WorkTransactionsScreen() {
  const { id: work_id } = useLocalSearchParams();
  const { reload, deactivateReload } = useTransactionOperationFlow();
  const { user } = useSession();
  const { semester } = useSemester();
  const { page, setPage, resetPagination, limit } = usePagination();

  const { transactions, refetch, isFetching, isLoading, total } =
    useTransactions({
      work_id: parseInt(work_id as string),
      administrative_upb_code: user!.upbCode,
      semester_id: semester!.value,
      limit,
      page,
    });

  const { work } = useCurrentWork();

  useFocusEffect(
    useCallback(() => {
      if (reload) {
        refetch();
        deactivateReload();
        resetPagination();
      }
    }, [reload])
  );

  return (
    <>
      <Screen>
        <Screen.Section>
          <Screen.SubTitle>
            Correspondientes al trabajo{" "}
            <Text
              className="text-lg font-outfit-semibold"
              style={{ color: "black" }}
            >
              "{work!.title}"{'\n'}
            </Text>
            <Text
              className="text-lg font-outfit-light"
              style={{ color: "black" }}
            >
              Mostrando {transactions.length} de {total}
            </Text>
          </Screen.SubTitle>
        </Screen.Section>
        <WorkTransactionsList
          transactions={transactions}
          isLoading={isFetching || isLoading}
          refetch={refetch}
        />
      </Screen>
      <CustomPagination
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={total}
      />
    </>
  );
}

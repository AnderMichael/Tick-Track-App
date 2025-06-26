import {
    CustomPagination,
    Screen,
    TransactionsList,
} from "@/components/common";
import { useCurrentStudent } from "@/context/administrative";
import { usePagination } from "@/hooks";
import { useTransactions } from "@/hooks/app";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function StudentInscriptionTransactionsScreen() {
  const { semester_id, semester_name } = useLocalSearchParams<{
    semester_id: string;
    semester_name: string;
  }>();
  const { student } = useCurrentStudent();
  const { page, setPage, limit } = usePagination();

  const { transactions, isFetching, isLoading, refetch, total } =
    useTransactions({
      student_upb_code: student!.upbCode,
      semester_id: parseInt(semester_id),
      page,
      limit,
    });

  return (
    <>
      <Screen>
        <Screen.Section>
          <Screen.SubTitle>
            Correspondientes al{" "}
            <Text
              className="text-lg font-outfit-medium"
              style={{ color: "black" }}
            >
              {semester_name}
              {"\n"}
            </Text>
            <Text
              className="text-base font-outfit-light mt-1"
              style={{ color: "black" }}
            >
              Mostrando {transactions.length} de {total}
            </Text>
          </Screen.SubTitle>
        </Screen.Section>

        <TransactionsList
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

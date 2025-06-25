import { Screen, TransactionsList, CustomPagination } from '@/components/common';
import { useSemester } from '@/context/home';
import { useSession } from '@/hooks';
import { useTransactions } from '@/hooks/app';
import { usePagination } from '@/hooks';
import React from 'react';
import { Text } from 'react-native';

const StudentTransactionListScreen = () => {
  const { semester } = useSemester();
  const { user } = useSession();
  const { page, setPage, limit } = usePagination();

  const { transactions, isFetching, isLoading, refetch, total } =
    useTransactions({
      student_upb_code: user!.upbCode,
      semester_id: semester!.value,
      page,
      limit,
    });

  return (
    <>
      <Screen>
        <Screen.Section>
          <Screen.SubTitle>
            Correspondientes al{' '}
            <Text
              className="text-lg font-outfit-medium"
              style={{ color: 'black' }}
            >
              {semester?.label}
              {'\n'}
            </Text>
            <Text
              className="text-base font-outfit-light mt-1"
              style={{ color: 'black' }}
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
};

export default StudentTransactionListScreen;

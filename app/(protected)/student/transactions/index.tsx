import { Screen, TransactionsList } from '@/components/common';
import { useSemester } from '@/context/home';
import React from 'react';
import { Text } from 'react-native';

const StudentTransactionListScreen = () => {
    const { semester } = useSemester();

    return (
        <Screen>
            <Screen.Section>
                <Screen.SubTitle>
                    Correspondientes al{' '}
                    <Text className="text-lg font-outfit-medium" style={{ color: 'black' }}>
                        {semester!.label}
                    </Text>
                </Screen.SubTitle>
            </Screen.Section>
            <TransactionsList />
        </Screen>
    );
};

export default StudentTransactionListScreen;

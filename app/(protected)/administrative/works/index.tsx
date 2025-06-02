import { Screen, WorksList } from '@/components/common';
import { useWorkOperationFlow } from '@/context/administrative';
import { useSemester } from '@/context/home';
import { useWorks } from '@/hooks/app';
import { useFocusEffect } from 'expo-router';
import React, { useCallback } from 'react';
import { Text } from 'react-native';

const WorksListScreen = () => {
  const { semester } = useSemester();
  const { isLoading, isFetching, refetch, works } = useWorks();

  const { reloadList, deactivateReloadList } = useWorkOperationFlow();

  useFocusEffect(
    useCallback(() => {
      if (reloadList) {
        refetch();
        deactivateReloadList();
      }
    }, [reloadList])
  );


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
      <WorksList
        works={works}
        isLoading={isLoading || isFetching}
        refetch={refetch}
      />
    </Screen>
  )
}

export default WorksListScreen
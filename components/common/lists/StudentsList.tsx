import { Student } from "@/interfaces/administrative";
import React, { useCallback } from "react";
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { StudentCard } from "../cards";
import { Screen } from "../containers";

interface Props {
  students: Student[];
  isLoading?: boolean;
  refetch?: () => void;
}

const StudentsList = ({ students, isLoading = false, refetch }: Props) => {
  const renderItem: ListRenderItem<Student> = useCallback(
    ({ item: student }) => (
      <StudentCard student_id={student.upbCode} isLocked={!student.isAvailable}>
        <StudentCard.Title>
          {student.firstName} {student.fatherLastName}
        </StudentCard.Title>
        <StudentCard.Email email={student.email} />
        <StudentCard.Department department={student.department} />
        <StudentCard.Id id={student.upbCode.toString()} />
      </StudentCard>
    ),
    []
  );

  if (isLoading) {
    return (
      <Screen.Section>
        <StudentCard isLoading />
        <StudentCard isLoading />
      </Screen.Section>
    );
  }

  return (
    <FlatList
      data={students}
      keyExtractor={(item) => item.upbCode.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 15 }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      ItemSeparatorComponent={() => <View className="h-4" />}
      ListEmptyComponent={
        <Text className="text-center text-2xl font-outfit-extralight">
          No se encontraron estudiantes
        </Text>
      }
    />
  );
};

export default StudentsList;

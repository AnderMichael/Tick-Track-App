import { Stack } from "expo-router";

export default function AdministrativeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="works"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="supervisors"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="semesters"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="scholarships"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="scholarship_officers"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

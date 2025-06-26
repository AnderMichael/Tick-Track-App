import { CustomHeader } from "@/components/common";
import { SemesterProvider } from "@/context/home";
import { Stack } from "expo-router";

export default function StudentInscriptionTransactionsLayout() {
  return (
    <SemesterProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => (
              <CustomHeader>
                <CustomHeader.Title>Transacciones</CustomHeader.Title>
              </CustomHeader>
            ),
          }}
        />
      </Stack>
    </SemesterProvider>
  );
}

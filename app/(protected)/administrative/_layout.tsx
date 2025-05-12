import { CustomHeader } from "@/components/common";
import { Stack } from "expo-router";

export default function AdministrativeLayout() {
    return (
        <Stack>
            <Stack.Screen name="works" options={{
                headerTransparent: true,
                header: () => <CustomHeader title="Trabajos" />,
            }} />
        </Stack>
    );
}
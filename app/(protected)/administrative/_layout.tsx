import { CustomHeader } from "@/components/common";
import { Stack } from "expo-router";

export default function AdministrativeLayout() {
    return (
        <Stack>
            <Stack.Screen name="works" options={{
                headerShown: false,
            }} />
        </Stack>
    );
}
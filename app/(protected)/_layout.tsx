import { useSession } from "@/hooks/common/useSession";
import { Redirect, Stack } from "expo-router";
import { useMemo } from "react";

export default function ProtectedLayout() {

    const { isAuthenticated, user } = useSession();

    if (!isAuthenticated) return <Redirect href="/auth/welcome" />;

    // const userScreen = useMemo(() => {
    //     if (user?.role === "STUDENT") return "student";
    //     if (user?.role === "SUPERVISOR") return "supervisor";
    //     if (user?.role === "ADMIN") return "admin";
    // }, [])

    // if (!userScreen) return <Redirect href="/auth/welcome" />;

    return (
        <Stack initialRouteName="home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" />
            {/* <Stack.Screen name={userScreen} /> */}
        </Stack>
    );
}
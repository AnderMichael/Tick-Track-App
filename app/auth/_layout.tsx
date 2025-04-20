import { Stack } from "expo-router";

export default function AuthLayout() {
    return <Stack initialRouteName="welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome" options={{animation: "default"}} />
        <Stack.Screen name="login" options={{animation: "default"}}/>
    </Stack>;
}

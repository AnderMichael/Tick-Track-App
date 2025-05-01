import { store } from "@/store/store";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Provider } from "react-redux";
import "../global.css";

import { Outfit_100Thin } from "@expo-google-fonts/outfit/100Thin";
import { Outfit_200ExtraLight } from "@expo-google-fonts/outfit/200ExtraLight";
import { Outfit_300Light } from "@expo-google-fonts/outfit/300Light";
import { Outfit_400Regular } from "@expo-google-fonts/outfit/400Regular";
import { Outfit_500Medium } from "@expo-google-fonts/outfit/500Medium";
import { Outfit_600SemiBold } from "@expo-google-fonts/outfit/600SemiBold";
import { Outfit_700Bold } from "@expo-google-fonts/outfit/700Bold";
import { Outfit_800ExtraBold } from "@expo-google-fonts/outfit/800ExtraBold";
import { Outfit_900Black } from "@expo-google-fonts/outfit/900Black";
import { useFonts } from "@expo-google-fonts/outfit/useFonts";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Outfit_100Thin,
    Outfit_200ExtraLight,
    Outfit_300Light,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Outfit_800ExtraBold,
    Outfit_900Black,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <Provider store={store}>
      <Stack initialRouteName="(protected)" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(protected)"/>
        <Stack.Screen name="auth"/>
      </Stack>
    </Provider>
  );
}

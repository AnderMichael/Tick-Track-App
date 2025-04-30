import { HomeActions, HomeCards, HomeCategories, HomeHeader } from "@/components/app";
import { ScrollView } from "react-native";

const HomeScreen = () => {
    return (
        <ScrollView className="flex-1 bg-white px-5 py-7" contentContainerStyle={{gap: 25}}>
            <HomeHeader />
            <HomeCards />
            <HomeCategories />
            <HomeActions />
        </ScrollView>
    );
}

export default HomeScreen;
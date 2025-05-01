import { HomeActions, HomeCards, HomeCategories, HomeHeader, SemesterDropdown } from "@/components/app";
import { ScrollView } from "react-native";

const HomeScreen = () => {
    return (
        <ScrollView className="w-full h-full bg-white" contentContainerStyle={{ gap: 25, paddingVertical: 15 }}>
            <HomeHeader />
            <SemesterDropdown />
            <HomeCards />
            <HomeCategories />
            <HomeActions />
        </ScrollView>
    );
}

export default HomeScreen;
import { HomeActions, HomeCards, HomeCategories, HomeHeader, SemesterDropdown } from "@/components/app";
import { useSession } from "@/hooks";
import { useEffect } from "react";
import { ScrollView } from "react-native";

const HomeScreen = () => {
    const { user } = useSession();
    useEffect(() => {
        console.log("HomeScreen mounted", user);
    }, []);
    return (
        <ScrollView className="flex-1 bg-white" contentContainerStyle={{gap: 25}}>
            <HomeHeader />
            <SemesterDropdown  />
            <HomeCards />
            <HomeCategories />
            <HomeActions />
        </ScrollView>
    );
}

export default HomeScreen;
import { HomeActions, HomeCards, HomeCategories, HomeHeader, HomeTimeSelector } from "@/components/app";
import { ProcessingModal } from "@/components/common";
import { useAuth, useSession } from "@/hooks";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";

const HomeScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const { userRequest, isLoading, error } = useAuth();
    const { login } = useSession();

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
        const user = await userRequest().unwrap();
        login(user);
    }, []);

    if (isLoading) return <ProcessingModal visible={isLoading} />;

    return (
        <ScrollView
            className="w-full h-full bg-white"
            contentContainerStyle={{ gap: 25, paddingVertical: 15 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <HomeHeader />
            <HomeTimeSelector />
            <HomeCards />
            <HomeCategories />
            <HomeActions />
        </ScrollView>
    );
};

export default HomeScreen;

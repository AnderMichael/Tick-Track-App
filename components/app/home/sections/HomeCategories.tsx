import { Screen } from "@/components/common";
import HomeAdministrativeCategories from "./HomeAdministrativeCategories";
import HomeStudentCategories from "./HomeStudentCategories";

export default function HomeCategories() {

    return (
        <Screen.Section>
            <HomeStudentCategories />
            <HomeAdministrativeCategories />
        </Screen.Section>
    );
}
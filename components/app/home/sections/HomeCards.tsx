import { Screen, WithRole } from "@/components/common";
import { Role } from "@/constants/common/roles";
import { useSemester } from "@/context/home";
import HomeHourCards from "./HomeHourCards";
import HomeWorkCards from "./HomeWorkCards";

export default function HomeCards() {
  const { inscription, semester } = useSemester();

  if (!inscription && !semester) {
    return <></>;
  }
  
  return (
    <Screen.Section>
      <Screen.Title>Tracks</Screen.Title>
      <WithRole allowed={[Role.STUDENT]}>
        {inscription && <HomeHourCards />}
      </WithRole>
      <WithRole allowed={[Role.SUPERVISOR, Role.SCHOLARSHIP_OFFICER, Role.ADMIN]}>
        {semester && <HomeWorkCards />}
      </WithRole>
    </Screen.Section>
  );
}
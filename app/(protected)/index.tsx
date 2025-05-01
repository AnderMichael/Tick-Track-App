import { Redirect } from "expo-router";
import { useSession } from "@/hooks/common/useSession";

export default function ProtectedIndex() {
  const { isAuthenticated } = useSession();

  if (!isAuthenticated) return <Redirect href="/auth/welcome" />;

  return <Redirect href="/home" />;
}

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout as logoutAction, setUser } from "@/store/slices/sessionSlice";
import { useRouter } from "expo-router";
import { useMemo } from "react";

export const useSession = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, loading } = useAppSelector((state) => state.session);

  const isAuthenticated = useMemo(() => {
    if (!user) {
        return false;
    }
    return true;
  }, [user]);

  const login = (userData: any) => {
    dispatch(setUser(userData));
  };

  const logout = () => {
    dispatch(logoutAction());
    router.replace("/");
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
  };
};

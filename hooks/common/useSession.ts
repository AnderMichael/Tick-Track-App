import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout as logoutAction, setUser } from "@/store/slices/sessionSlice";

export const useSession = () => {
    const dispatch = useAppDispatch();
    const { user, loading } = useAppSelector((state) => state.session);
    const isAuthenticated = !!user;

    const login = (userData: any) => {
        dispatch(setUser(userData));
    };

    const logout = () => {
        dispatch(logoutAction());
    };

    return {
        user,
        loading,
        isAuthenticated,
        login,
        logout,
    };
};

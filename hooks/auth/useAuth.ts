import { useGetMeMutation, useLoginMutation } from "@/store/api/auth";
import { useMemo } from "react";

export const useAuth = () => {
    const [loginRequest, { isLoading: isLoadingLogin, error: errorLogin }] = useLoginMutation();
    const [userRequest, { isLoading: isLoadingUser, error: errorUser }] = useGetMeMutation();

    const isLoading = useMemo(() => {
        return isLoadingLogin || isLoadingUser;
    }, [isLoadingLogin, isLoadingUser]);


    const error = useMemo(() => {
        if (errorLogin) return errorLogin;
        if (errorUser) return errorUser;
        return null;
    }, [errorLogin, errorUser]);

    return {
        userRequest,
        loginRequest,
        isLoading,
        error,
    }
}
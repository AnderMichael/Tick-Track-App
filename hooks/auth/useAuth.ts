import { useGetMeMutation, useLoginMutation, useResetPasswordMutation } from "@/store/api/auth";
import { useMemo } from "react";

export const useAuth = () => {
    const [loginRequest, { isLoading: isLoadingLogin, error: errorLogin }] = useLoginMutation();
    const [userRequest, { isLoading: isLoadingUser, error: errorUser }] = useGetMeMutation();
    const [resetPassword, {isLoading: isLoadingResetPassword, error: errorResetPassword}] = useResetPasswordMutation();
    const isLoading = useMemo(() => {
        return isLoadingLogin || isLoadingUser || isLoadingResetPassword;
    }, [isLoadingLogin, isLoadingUser, isLoadingResetPassword]);


    const error = useMemo(() => {
        if (errorLogin) return errorLogin;
        if (errorUser) return errorUser;
        if (errorResetPassword) return errorResetPassword;
        return null;
    }, [errorLogin, errorUser, errorResetPassword]);

    return {
        userRequest,
        loginRequest,
        resetPassword,
        isLoading,
        error,
    }
}
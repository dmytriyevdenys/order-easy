import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "axios";
import { TSignIn } from "interfaces/auth/sign-in.type";
import { ExtendedAxiosError } from "interfaces/axios-error.interface";
import { LocalStorageManager } from "local-storage";
import { authService } from "services/auth.service";

export const useLogin = (loginData: TSignIn) => {
    const localStorage = new LocalStorageManager('token');
    const client = useQueryClient();
    return useMutation({
        mutationFn: () => authService.login(loginData),
        onSuccess: (auth) => {
           const  {access_token} = auth;
            localStorage.clearData();
            localStorage.setData([access_token])
            client.setQueryData(['auth'], {isAuth: true})
        },
        onError: async (error: ExtendedAxiosError ) => {
            if (error instanceof Axios) {
                throw error
            }
        }
    })
}
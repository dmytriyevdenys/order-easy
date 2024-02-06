import { useMutation, useQueryClient } from "@tanstack/react-query"
import {  AxiosError } from "axios";
import { ExtendedAxiosError } from "interfaces/axios-error.interface";
import { LocalStorageManager } from "local-storage";
import { authService } from "services/auth.service"

export const useRefreshToken = (access_token: string) => {
    const client = useQueryClient();
    const localStorage = new LocalStorageManager('token');

    return useMutation({
        mutationFn: () => authService.refresh(access_token),
        onSuccess: (token) => {
            token && client.setQueryData(['auth'], { isAuth: true });
            localStorage.clearData();
            localStorage.setData([token])
        },
        onError: (error: ExtendedAxiosError) =>  {
            if (error instanceof AxiosError) {
                throw error;
            }
        }
    })
}
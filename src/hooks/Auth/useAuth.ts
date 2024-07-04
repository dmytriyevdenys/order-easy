import { useQuery, useQueryClient } from "@tanstack/react-query"
import { LOGIN_ROUTE } from "constans/routes";
import { ExtendedAxiosError } from "types/axios-error.interface";
import { useNavigate } from "react-router-dom";
import { authService } from "services/auth.service"
import { CACHE_TIME, STALE_TIME } from "constans/queryConfig";

export const useAuth = () => {
    const client = useQueryClient();
    const navigate = useNavigate();
    return useQuery({
        queryKey: ['user, me'],
        queryFn: () => authService.authMe(),
        onSuccess: (data) => {
           data &&  client.setQueryData(['auth'], { isAuth: true });
        },
        retry: 1,
        onError: (error: ExtendedAxiosError) => {
            if(error.response)
            error.response.status === 401 && navigate(LOGIN_ROUTE)
        },
        staleTime: STALE_TIME,
        cacheTime: CACHE_TIME
    })
}
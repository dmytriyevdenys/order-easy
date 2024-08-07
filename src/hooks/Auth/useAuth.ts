import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ExtendedAxiosError } from "types/axios-error.interface";
import { useNavigate } from "react-router-dom";
import { authService } from "services/auth.service"
import { LOGIN_ROUTE } from "config/routes";
import { CACHE_TIME, STALE_TIME } from "config/cacheConfig";
import { defineAbilityFor } from "utils/ability";
export const useAuth = () => {
    const client = useQueryClient();
    const navigate = useNavigate();
    return useQuery({
        queryKey: ['user','me'],
        queryFn: () => authService.authMe(),
        onSuccess: (data) => {
           data &&  client.setQueryData(['auth'], { isAuth: true });
           defineAbilityFor(data);
        },
        retry: 1,
        onError: (error: ExtendedAxiosError) => {
            if(error.response)
            error.response.status === 401 && navigate(LOGIN_ROUTE)
        },
        cacheTime: CACHE_TIME,
        staleTime: STALE_TIME
    })
}
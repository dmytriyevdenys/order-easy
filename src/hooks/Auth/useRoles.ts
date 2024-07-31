import { useQuery } from "@tanstack/react-query"
import { CACHE_TIME, STALE_TIME } from "config/cacheConfig"
import { authService } from "services/auth.service"

export const useRoles = () => {
    return useQuery ({
        queryKey: ['roles'],
        queryFn: ()  => authService.getRoles(),
        cacheTime: CACHE_TIME,
        staleTime: STALE_TIME
    })
}
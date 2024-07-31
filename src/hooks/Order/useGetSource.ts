import { useQuery } from "@tanstack/react-query"
import { orderService } from "../../services/order.service"
import { CACHE_TIME, STALE_TIME } from "config/cacheConfig"

export const useGetSources = () => {
    return useQuery({
        queryKey: ['sources'],
        queryFn: () => orderService.getSources(),
        cacheTime: CACHE_TIME,
        staleTime: STALE_TIME
    })
}
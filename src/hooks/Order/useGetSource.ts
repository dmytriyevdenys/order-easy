import { useQuery } from "@tanstack/react-query"
import { orderService } from "../../services/order.service"
import { CACHE_TIME, STALE_TIME } from "constans/queryConfig"

export const useGetSources = () => {
    return useQuery({
        queryKey: ['sources'],
        queryFn: () => orderService.getSources(),
        staleTime: STALE_TIME,
        cacheTime: CACHE_TIME
    })
}
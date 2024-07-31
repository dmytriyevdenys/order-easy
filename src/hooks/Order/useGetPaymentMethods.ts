import { useQuery } from "@tanstack/react-query"
import { CACHE_TIME, STALE_TIME } from "config/cacheConfig"
import { orderService } from "services/order.service"

export const useGetPaymentMethods = () => {
    return useQuery({
        queryKey: ['paymentMethods'],
        queryFn: () => orderService.getPaymentMethods(),
        select: (data) => data.data,
        cacheTime: CACHE_TIME,
        staleTime: STALE_TIME
    })
}
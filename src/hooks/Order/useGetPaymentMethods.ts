import { useQuery } from "@tanstack/react-query"
import { CACHE_TIME, STALE_TIME } from "constans/queryConfig"
import { orderService } from "services/order.service"

export const useGetPaymentMethods = () => {
    return useQuery({
        queryKey: ['paymentMethods'],
        queryFn: () => orderService.getPaymentMethods(),
        select: (data) => data.data,
        staleTime: STALE_TIME,
        cacheTime: CACHE_TIME
    })
}
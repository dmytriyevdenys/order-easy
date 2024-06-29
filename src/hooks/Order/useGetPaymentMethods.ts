import { useQuery } from "@tanstack/react-query"
import { orderService } from "services/order.service"

export const useGetPaymentMethods = () => {
    return useQuery({
        queryKey: ['paymentMethods'],
        queryFn: () => orderService.getPaymentMethods(),
        select: (data) => data.data
    })
}
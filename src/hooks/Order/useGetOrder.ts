import { useQuery } from "@tanstack/react-query"
import { orderService } from "services/order.service"

export const useGetOrder = (orderId: number | null) => {    
    return useQuery({
        queryKey: ['order', orderId],
        queryFn: () => orderService.getOrderById(orderId ? orderId: 0),
        enabled: !!orderId && typeof orderId === 'number'
    })
}
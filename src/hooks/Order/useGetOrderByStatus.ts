import { useQuery, useQueryClient } from "@tanstack/react-query"
import { TOrderSmall } from "interfaces/order/order-small.type";
import { orderService } from "services/order.service"

export const useGetOrderByStatus = (statuses: number[]) => {
    const client = useQueryClient();    
    return useQuery({
        queryKey: [statuses], 
        queryFn: () => orderService.getOrdersByStatus(statuses),
        onSuccess: (ordersData) => {
         client.setQueryData<TOrderSmall[]>(['orders'], (oldData) => {
            const orders = Object.values(ordersData).flat(1);            
          if (oldData) {
            return [...orders, ...oldData]
          }
          return [...orders]
         });
         
        }
    })
}
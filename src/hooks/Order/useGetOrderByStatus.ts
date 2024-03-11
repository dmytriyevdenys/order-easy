import { useQuery, useQueryClient } from "@tanstack/react-query"
import { TOrderSmall } from "interfaces/order/order-small.type";
import { orderService } from "services/order.service"

export const useGetOrderByStatus = (statuses: number[]) => {
  return useQuery({
      queryKey: [statuses], 
      queryFn: () => orderService.getOrdersByStatus(statuses),
      select: (data) => {
          return data.filter(item => item.orders.filter(order => order !== null));
      },
      enabled: !!statuses.length
  });
};
import { useQuery } from "@tanstack/react-query"
import { orderService } from "services/order.service"

export const useGetStatuses = () => {
    return useQuery({
        queryKey: ['statuses'],
        queryFn: () => orderService.getStatuses(),
        initialData: () => [{
            id: 1,
            name: 'Нове замовлення',
            alias: 'new',
            color: '#36B441',
            is_active: true
          }]
    })
}
import { useQuery } from "@tanstack/react-query"
import { orderService } from "services/order.service"

type StatusFilter = {
    all?: boolean
}
export const useGetStatuses = (filter?: StatusFilter) => {
    return useQuery({
        queryKey: ['statuses'],
        queryFn: () => orderService.getStatuses(filter?.all),
        initialData: () => [{
            id: 1,
            name: 'Нове замовлення',
            alias: 'new',
            color: '#36B441',
            is_active: true
          }],
          staleTime: 1000 * 60 * 10,
          cacheTime: 1000 * 60 * 60
    })
}
import { useQuery } from "@tanstack/react-query"
import { orderService } from "services/order.service"

export const useGetStatuses = () => {
    return useQuery({
        queryKey: ['statuses'],
        queryFn: () => orderService.getStatuses(),
        enabled: false
    })
}
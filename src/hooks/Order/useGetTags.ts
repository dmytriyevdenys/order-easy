import { useQuery } from "@tanstack/react-query"
import { orderService } from "services/order.service"

export const useGetTags = () => {
    return useQuery({
        queryKey: ['tags'],
        queryFn: () => orderService.getTags(),
        enabled: false
    })
}
import { useQuery } from "@tanstack/react-query"
import { orderService } from "../../services/order.service"

export const useGetSources = () => { 
    return useQuery({
        queryKey: ['sources'],
        queryFn: () => orderService.getSource(),
    })
}
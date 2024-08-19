import { useQuery } from "@tanstack/react-query"
import { buyerService } from "services/buyer.service"

export const useBuyerSearch = (search: string) =>  {
    return useQuery({
        queryKey: ['buyer', search],
        queryFn: () => buyerService.findBuyer(search),
        retry: 0,
        enabled: false
    })
}
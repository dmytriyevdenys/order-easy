import { useQuery } from "@tanstack/react-query"
import { addressService } from "services/adress.service"

export const useGetSettlement = (settlementName: string, get: boolean) => {
    return useQuery({
        queryKey: ['settlements', settlementName],
        queryFn: () => addressService.getSettlement(settlementName),
        enabled: get
    })
}
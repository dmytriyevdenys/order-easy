import { useQuery } from "@tanstack/react-query"
import { addressService } from "services/adress.service"

export const useGetWarehouse = (cityRef: string, cityId: string) => {
    return useQuery({
        queryKey: ['warehouse', cityRef, cityId],
        queryFn: () => addressService.getWarehouse(cityRef, cityId),
        enabled: !!cityRef
    })
}
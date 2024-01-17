import { useQuery } from "@tanstack/react-query"
import { adressService } from "services/adress.service"

export const useGetWarehouse = (cityRef: string, cityId: string) => {
    return useQuery({
        queryKey: ['warehouse', cityRef, cityId],
        queryFn: () => adressService.getWarehouse(cityRef, cityId),
        enabled: !!cityRef
    })
}
import { useQuery } from "@tanstack/react-query"
import { adressService } from "services/adress.service"

export const useGetCity = (cityName: string, get: boolean) => {
    
    return useQuery({
        queryKey: ['cities', cityName],
        queryFn: () => adressService.getCity(cityName),
        enabled: get
    })
}
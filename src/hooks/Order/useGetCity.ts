import { useQuery } from "@tanstack/react-query"
import { adressService } from "services/adress.service"

export const useGetCity = (cityName: string, get: boolean) => {
    const validateInput = () => {
        const cyrillicRegex = /^[\u0400-\u04FF]+$/;
       if (!cyrillicRegex.test(cityName) && cityName.length > 0) return true
      }
    const error = validateInput()
    return useQuery({
        queryKey: ['cities', cityName],
        queryFn: () => adressService.getCity(cityName),
        enabled: get && cityName.length > 0 && !error,
    })
}
import { useQuery } from "@tanstack/react-query"
import { packerService } from "../../services/packer.service"

export const usePackers = () => { 
   return useQuery({
    queryKey: ['packers'],
    queryFn: () => packerService.getAllPackers(),
    select: ({data}) => data,
    enabled: false
   })
}
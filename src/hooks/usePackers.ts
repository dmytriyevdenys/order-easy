import { useQuery } from "@tanstack/react-query"
import { packerService } from "../services/packer.service"

export const usePackers = () => { 
   return useQuery(
        ['packers'],
        () => packerService.getAllPackers(),
        {
            select: ({ data }) => data.data
        }
    )
}
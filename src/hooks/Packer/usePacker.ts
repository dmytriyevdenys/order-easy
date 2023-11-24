import { useQuery } from "@tanstack/react-query"
import { packerService } from "../../services/packer.service"



export const usePacker = (id: number | null) => { 

    return useQuery({
       queryKey: ['packer',id ],
       queryFn: async() => await packerService.getPackerById(Number(id)),
       enabled: !!id,
       select: data => ({
         ...data,
         data: data.data.map(intDoc => ({
            ...intDoc,
            createdAt: new Date(intDoc.createdAt).toLocaleString()
         }))
       })
    });
 }
import { useQuery } from "@tanstack/react-query";
import { packerService } from "../../services/packer.service";

export const useIntDocs = (packerId: number | null) => { 
    const queryKey = packerId ? ['packer', packerId] : ['packer', 'allIntDocs'];

    return useQuery ({
        queryKey,
        queryFn: () => packerService.getIntDocs(Number(packerId)),
        select: (data) => ({
            ...data,
            data: data.data.map((intDoc) => ({
              ...intDoc,
              createdAt: new Date(intDoc.createdAt).toLocaleString(),
            }))
          })
    })
}
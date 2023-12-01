import { useQuery } from "@tanstack/react-query";
import { packerService } from "../../services/packer.service";

export const useIntDocs = (options: { limit?: number ; page?: number } = {},packerId?: number,
   ) => { 
    const queryKey = packerId ? ['packer', packerId, options] : ['packer', 'allIntDocs', options];
    return useQuery ({
        queryKey,
        queryFn: () => packerService.getIntDocs({
          packerId,
          options
        }),
        select: (data) => ({
            ...data,
            data: data.data.map((intDoc) => ({
              ...intDoc,
              createdAt: new Date(intDoc.createdAt).toLocaleString(),
            }))
          }),
    })
}
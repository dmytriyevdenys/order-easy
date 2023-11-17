import { useQuery } from "@tanstack/react-query"
import { packerService } from "../services/packer.service"


export const usePacker = (id: number | null) => { 

    return useQuery({
       queryKey: ['packer',id ],
       queryFn: () => packerService.getPackerById(Number(id)),
       enabled: !!id,
       select: (data) => ({
        intDocs: data?.internet_document
          ? data.internet_document.concat().reverse().map((intDoc) => ({
              id: intDoc.id,
              IntDocNumber: intDoc.IntDocNumber,
              createdAt: new Date(intDoc.createdAt).toLocaleString(),
              addedOffline:intDoc.addedOffline
            }))
          : [],
      }),
    })
 }
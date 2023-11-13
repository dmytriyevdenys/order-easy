import { useMutation, useQueryClient } from "@tanstack/react-query"
import { packerService } from "../services/packer.service";
import { IntDoc } from "./usePacker";
import { IPacker } from "../interfaces/packer.interface";

export const useAddIntDoc = (idPacker: number, intDocNumber: string, ) =>  { 
    const client = useQueryClient();

    return useMutation({
        mutationFn: async () => packerService.scanIntDoc(idPacker, intDocNumber),
        
         onSuccess: (newIntDoc) => {
            client.setQueriesData<IPacker>(['packer', idPacker], (oldPacker) => {
                if (oldPacker) {
                    return {
                        ...oldPacker,
                        internet_document: [...(oldPacker.internet_document || []), newIntDoc]
                    };
                }
                return oldPacker;
            })
         },
        onError: (error) => {
            if (error instanceof Error) {
                throw error
            }
        }
    })
}
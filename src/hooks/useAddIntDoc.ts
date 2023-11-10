import { useMutation, useQueryClient } from "@tanstack/react-query"
import { packerService } from "../services/packer.service";

export const useAddIntDoc = (idPacker: number, intDocNumber: string, ) =>  { 

    const client = useQueryClient();

    return useMutation({
        mutationFn: () => packerService.scanIntDoc(idPacker, intDocNumber),
        onSuccess: () => { 
            client.invalidateQueries({queryKey: ['packer', idPacker],})
        }
    })
}
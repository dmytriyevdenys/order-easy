import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { packerService } from "../../services/packer.service"

export const useCheckPacker  = (packerId: number, password: {password: string}) => {
    const client = useQueryClient();
    return useMutation ({
     mutationFn: () => packerService.checkPacker(packerId, password),
       onSuccess: () => {
        client.invalidateQueries(["packer", packerId]);
       },
       onError: () => {}
    })
}
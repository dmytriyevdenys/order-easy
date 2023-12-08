import { useMutation, useQueryClient } from "@tanstack/react-query"
import { packerService } from "../../services/packer.service"
import { AxiosError } from "axios";
import { ExtendedAxiosError } from "../../interfaces/axios-error.interface";

export const useCheckPacker  = (packerId: number, password: {password: string}) => {
    const client = useQueryClient();
    return useMutation ({
     mutationFn: () => packerService.checkPacker(packerId, password),
       onSuccess: () => {
        client.invalidateQueries(["packer", packerId,]);
       },
       
       onError: (error: ExtendedAxiosError) => {
        if (error instanceof AxiosError) {
          throw error;
        }
       },
    })
}
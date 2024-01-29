import { useMutation, useQueryClient } from "@tanstack/react-query"
import { packerService } from "../../services/packer.service"
import { AxiosError } from "axios";
import { ExtendedAxiosError } from "../../interfaces/axios-error.interface";
import { LocalStorageManager } from "local-storage";
import { IPacker } from "interfaces/packer.interface";

export const useCheckPacker  = (packerId: number, password: {password: string}) => {
  const localStorage = new LocalStorageManager<IPacker>('packer');
    const client = useQueryClient();

    return useMutation ({
     mutationFn: () => packerService.checkPacker(packerId, password),
       onSuccess: (packer) => {
        client.invalidateQueries(["packer", packerId,]);
        localStorage.clearData();
        localStorage.setData([packer])
       },
       
       onError: (error: ExtendedAxiosError) => {
        if (error instanceof AxiosError) {
          throw error;
        }
       },
    })
}
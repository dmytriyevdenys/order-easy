// useAddIntDoc.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { packerService } from "../services/packer.service";
import { IPacker } from "../interfaces/packer.interface";
import { AxiosError } from "axios";
import { ExtendedAxiosError } from "../interfaces/axios-error.interface";

export const useAddIntDoc = (idPacker: number, intDocNumber: string) => {
  const client = useQueryClient();
  
  return useMutation({
    mutationFn: async () =>  packerService.scanIntDoc(idPacker, intDocNumber)
    ,
    onSuccess: (newIntDoc) => {      
      client.setQueriesData<IPacker>(["packer", idPacker], (oldPacker) => {
        
        if (oldPacker) {
          return {
            ...oldPacker,
            internet_document: [
              ...(oldPacker.internet_document || []),
              newIntDoc,
            ],
          };
        }
        return oldPacker;
      });
    },
    onError: async (error: ExtendedAxiosError) => {
      if (error instanceof AxiosError) {
        throw error;
      }
    },
  });
};

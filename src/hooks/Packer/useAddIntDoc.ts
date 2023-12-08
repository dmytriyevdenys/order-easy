// useAddIntDoc.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { packerService } from "../../services/packer.service";
import { AxiosError } from "axios";
import { ExtendedAxiosError } from "../../interfaces/axios-error.interface";
import { IntDoc } from "../../interfaces/int-doc.type";
import { ApiResponse } from "../../interfaces/api-response.interface";


export const useAddIntDoc = (packerId: number, intDocNumber: string) => {
  const client = useQueryClient();
  
  return useMutation({
    mutationFn:  () =>  packerService.scanIntDoc(packerId, { IntDocNumber: intDocNumber }),
    onSuccess: (newIntDoc) => {
      client.setQueriesData<ApiResponse<IntDoc[]>>(["packer", packerId], (oldPacker) => {
        if (oldPacker) {          
          return {
            ...oldPacker,
            data: [newIntDoc.data, ...oldPacker.data],  
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

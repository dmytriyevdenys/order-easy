// useAddIntDoc.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { packerService } from "../../services/packer.service";
import { AxiosError } from "axios";
import { ExtendedAxiosError } from "../../interfaces/axios-error.interface";
import { IntDoc } from "../../interfaces/int-doc.type";
import {
  ApiResponsePagination,
} from "../../interfaces/api-response.interface";

export const useAddIntDoc = (packerId: number, intDocNumber: string) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: () =>
      packerService.scanIntDoc(packerId, { IntDocNumber: intDocNumber }),
    onSuccess: (newIntDoc) => {
      client.setQueriesData<ApiResponsePagination<IntDoc[]>>(
        ["packer", packerId],
        (oldPacker) => {
          if (oldPacker) {
            if (oldPacker.data.length === 1)
              client.invalidateQueries(["packer", packerId]);
            return {
              ...oldPacker,
              data: [newIntDoc.data, ...oldPacker.data.slice(0, -1)]};
          }
          client.invalidateQueries(["packer", packerId]);
        }
      );
    },
    onError: async (error: ExtendedAxiosError) => {
      if (error instanceof AxiosError) {
        
        throw error;
      }
    },
  });
};

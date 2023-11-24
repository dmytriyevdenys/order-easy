import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LocalStorageManager } from "../../local-storage";
import { packerService } from "../../services/packer.service";
import { IntDoc } from "../../interfaces/int-doc.type";

export const useSyncWithServer = (isOnline: boolean, packerId: number) => {
  const localStorage = new LocalStorageManager<IntDoc>(packerId.toString());
  const storageData = localStorage.getData();
  const client = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (isOnline && storageData && storageData.length > 0) {
        const newIntDoc = await Promise.all(
          storageData.map(async (intDoc) => {
            return await packerService.scanIntDoc(
              packerId,
              {IntDocNumber: intDoc.IntDocNumber, createdAt: intDoc.createdAt}
            );
          })
        );

        localStorage.clearData();
        return newIntDoc;
      } else {
        return [];
      }
    },
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['packer', packerId]})
    },
  });
};

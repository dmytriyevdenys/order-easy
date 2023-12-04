import { useQueryClient } from "@tanstack/react-query";
import { IntDoc } from "../../interfaces/int-doc.type";
import { LocalStorageManager } from "../../local-storage";
import { ApiResponse } from "../../interfaces/api-response.interface";

export const useOfflineAddIntDoc = (packerId: number, intDocNumber: string) => {
  const localStorage = new LocalStorageManager<IntDoc>(packerId.toString());
  const client = useQueryClient();

  const intDoc: IntDoc = {
    IntDocNumber: intDocNumber,
    createdAt: new Date().toString(),
    id: Number(intDocNumber),
    status: 'offline'
  };
  
  const setDateForLocalstoradge = () => {
    const storedData = localStorage.getData();
    const updateData = [...storedData, intDoc];
    localStorage.setData(updateData);
    client.setQueriesData<ApiResponse<IntDoc[]>>(["packer", packerId], (oldPacker) => {
          if (oldPacker) {
            return {
              ...oldPacker,
              data: [intDoc, ...oldPacker.data],  
            };
          }
       return oldPacker
    }) }
  return setDateForLocalstoradge;

};

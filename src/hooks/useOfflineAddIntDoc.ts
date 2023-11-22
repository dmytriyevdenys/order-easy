import { useQueryClient } from "@tanstack/react-query";
import { IntDoc } from "../interfaces/int-doc.type";
import { LocalStorageManager } from "../local-storage";
import { IPacker } from "../interfaces/packer.interface";

export const useOfflineAddIntDoc = (packerId: number, intDocNumber: string) => {
  const localStorage = new LocalStorageManager<IntDoc>(packerId.toString());
  const client = useQueryClient();

  const intDoc: IntDoc = {
    IntDocNumber: intDocNumber,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: Number(intDocNumber),
    Ref: "",
    EstimatedDeliveryDate: "",
    CostOnSite: "",
    status: 'offline'
  };
  
  const setDateForLocalstoradge = () => {
    const storedData = localStorage.getData();
    const updateData = [...storedData, intDoc];
    localStorage.setData(updateData);
    client.setQueriesData<IPacker>(["packer", packerId], (oldPacker) => {
        console.log(intDoc);

        if (oldPacker) {
            return {
              ...oldPacker,
              internet_document: [
                ...(oldPacker.internet_document || []),
                intDoc,
              ],
            };
          }
          return oldPacker;
    }) }
  return setDateForLocalstoradge;

};

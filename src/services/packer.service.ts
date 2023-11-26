import axios from "axios"
import { IPacker } from "../interfaces/packer.interface";
import { ApiResponse } from "../interfaces/api-response.interface";
import { IntDoc } from "../interfaces/int-doc.type";
import { TScanIntDoc } from "../interfaces/packer/scan-int-doc.type";

 class PackerService { 
  private  baseUrl = 'http://localhost:8000/packer';
  private baseUrlIntDoc = 'http://localhost:8000/internet-document'

    async getAllPackers () {
        const packers = await axios.get<ApiResponse<IPacker[]>>(this.baseUrl);  
        return  packers
    }

    async getIntDocs(packerId?: number): Promise<ApiResponse<IntDoc[]>> {
        const url = packerId ? `${this.baseUrlIntDoc}?packerId=${packerId}` : this.baseUrlIntDoc;
      
          const response = await axios.get<ApiResponse<IntDoc[]>>(url);
          return response.data;
      }

    async checkPacker (id: number, password: {password: string}): Promise<IPacker> {
        const response = await axios.post<IPacker>(`${this.baseUrl}/${id}`, password);
        return response.data
    }
 
    async scanIntDoc (id: number, intDoc: TScanIntDoc): Promise<ApiResponse<IntDoc>> {
        const response  =  await axios.post<ApiResponse<IntDoc>>(`${this.baseUrl}/${id}/scan/`, intDoc);  
        return response.data
    }
}

export const packerService = new PackerService()
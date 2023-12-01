import axios from "axios"
import { IPacker } from "../interfaces/packer.interface";
import { ApiResponse, ApiResponsePagination } from "../interfaces/api-response.interface";
import { IntDoc } from "../interfaces/int-doc.type";
import { TScanIntDoc } from "../interfaces/packer/scan-int-doc.type";

 class PackerService { 
  private  baseUrl = 'http://localhost:8000/packer';
  private baseUrlIntDoc = 'http://localhost:8000/internet-document'

    async getAllPackers () {
        const packers = await axios.get<ApiResponse<IPacker[]>>(this.baseUrl);  
        return  packers
    }

    async getIntDocs({
        packerId,
        options = {},
      }: {
        packerId?: number;
        options?: { limit?: number; page?: number };
      } = {}): Promise<ApiResponsePagination<IntDoc[]>> {
        const url = packerId
          ? `${this.baseUrlIntDoc}?packerId=${packerId}`
          : this.baseUrlIntDoc;
      
        const response = await axios.get<ApiResponsePagination<IntDoc[]>>(url, {
          params: options,
        });
      
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
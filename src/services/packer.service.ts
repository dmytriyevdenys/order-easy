import axios from "axios"
import { IPacker } from "../interfaces/packer.interface";
import { ApiResponse } from "../interfaces/api-response.interface";
import { IntDoc } from "../hooks/usePacker";

 class PackerService { 
  private  baseUrl = 'http://localhost:8000/packer';


    async getAllPackers () {
        const packers = await axios.get<ApiResponse<IPacker[]>>(this.baseUrl);  
        return  packers
    }

    async getPackerById(id: number) {
        const response = await axios.get<IPacker>(`${this.baseUrl}/${id}?include=internet_document`);
        return response.data; 
    }

    async checkPacker (id: number, password: {password: string}): Promise<IPacker> {
        const response = await axios.post<IPacker>(`${this.baseUrl}/${id}`, password);
        return response.data
    }
 
    async scanIntDoc (id: number, intDocNumber: string): Promise<IntDoc> {
        const response  =  await axios.post<ApiResponse<IntDoc>>(`${this.baseUrl}/${id}/scan/${intDocNumber}`);
        return response.data.data
    }
}

export const packerService = new PackerService()
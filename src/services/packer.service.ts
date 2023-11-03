import axios from "axios"
import { IPacker } from "../interfaces/packer.interface";
import { ApiResponse } from "../interfaces/api-response.interface";

 class PackerService { 
  private  baseUrl = 'http://localhost:8000/packer';


    async getAllPackers () {
        const packers = await axios.get<ApiResponse<IPacker[]>>(this.baseUrl);  
        return  packers
    }

    async getPackerById(id: number) { 
        return await axios.get(`${this.baseUrl}/${id}`);
    }

    async scanIntDoc (id: number, intDocNumber: string) { 
        return await axios.post(`${this.baseUrl}/${id}/scan/${intDocNumber}`);
    }
}

export const packerService = new PackerService()
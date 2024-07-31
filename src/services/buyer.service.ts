import { TBuyer } from "types/buyer/buyer.type";
import { api } from "../config/api/axiosConfig";

class BuyerService { 
   private path = 'buyer';
   
   async findBuyer (search: string) {
    const buyers = await api.get<TBuyer[]>(`${this.path}?search=${search}`);
    return buyers.data;
    }
}

export const buyerService = new BuyerService();
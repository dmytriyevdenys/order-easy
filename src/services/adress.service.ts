import { TCity } from "interfaces/order/city.type";
import { api } from "./api/axiosConfig";

class AdressService {
 private path = 'address';

    async getCity (name: string) {
      
        const cities = await api.get<TCity[]>(`${this.path}/city`, {params: {name}});
        return cities.data;
    }
}

export const adressService = new AdressService();
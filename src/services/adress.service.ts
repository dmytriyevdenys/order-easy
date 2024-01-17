import { TCity } from "interfaces/order/city.type";
import { api } from "./api/axiosConfig";
import { TWarehouse } from "interfaces/order/warehouse.type";

class AdressService {
 private path = 'address';

    async getCity (name: string): Promise<TCity[]> {
       const cities = await api.get<TCity[]>(`${this.path}/city`, {params: {name}});
        return cities.data;
    }

    async getWarehouse (ref: string, number: string): Promise<TWarehouse[]> {
        const warehouses = await api.get<TWarehouse[]>(`${this.path}/warehouse`, {params: {ref, number}});
        return warehouses.data;
    }
}

export const adressService = new AdressService();
import axios from "axios";
import { OrderAssociations } from "../interfaces/order/order-associations";
import { api } from "./api/axiosConfig";
import { TUser } from "interfaces/user/user.type";

class OrderService {
    private path = 'order';
    
    async getSources() {
        const sources = await api.get<OrderAssociations[]>(`${this.path}/source`);
        return sources.data;
    }

    async getStatuses () {
        const statuses = await api.get<OrderAssociations[]>(`${this.path}/status`);
        return statuses.data;
    }

    async getUsers () { 
        const users = await api.get<TUser[]>('user');
        return users.data
    }

}

export const orderService = new OrderService();
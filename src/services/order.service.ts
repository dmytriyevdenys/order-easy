import { OrderAssociations } from "../interfaces/order/order-associations";
import { TUser } from "interfaces/user/user.type";
import { api } from "./api/axiosConfig";
import { TTag } from "interfaces/order/tag.type";
import { TStatus } from "interfaces/order/status.type";
import { ApiResponse } from "interfaces/api-response.interface";

class OrderService {
    private path = 'order';
    
    async getSources() {
        const sources = await api.get<OrderAssociations[]>(`${this.path}/source`);
        return sources.data;
    }

    async getStatuses () {
        const statuses = await api.get<TStatus[]>(`${this.path}/status`);
        return statuses.data;
    }

    async getUsers () { 
        const users = await api.get<TUser[]>('user');
        return users.data
    }

    async getTags () {
        const tags = await api.get<TTag[]>(`${this.path}/tag`);
        return tags.data;
    }

}

export const orderService = new OrderService();
import { OrderAssociations } from "../interfaces/order/order-associations";
import { TUser } from "interfaces/user/user.type";
import { api } from "./api/axiosConfig";
import { TTag } from "interfaces/order/tag.type";
import { TStatus } from "interfaces/order/status.type";
import { TOrderByStatus } from "interfaces/order/order-small.type";

class OrderService {
    private path = 'order';

    async getOrdersByStatus (statusId: number[]) {
        
        const orders = await api.get<TOrderByStatus>(`${this.path}`, {
            params: {statuses: statusId.join(',')}
        })
        
        return orders.data;
    }
    
    async getSources() {
        const sources = await api.get<OrderAssociations[]>(`${this.path}/source`);
        return sources.data;
    }

    async getStatuses () {
        const statuses = await api.get<TStatus[]>(`${this.path}/status`, {
            params: {id: '1,2,3,5,6,7'}
        });
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
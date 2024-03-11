import { OrderAssociations } from "../interfaces/order/order-associations";
import { TUser } from "interfaces/user/user.type";
import { api } from "./api/axiosConfig";
import { TTag } from "interfaces/order/tag.type";
import { TStatus } from "interfaces/order/status.type";
import { TOrderByStatus } from "interfaces/order/order-small.type";
import { TOrder } from "interfaces/order/order.type";

class OrderService {
    private path = 'order/';


    async updateOrder (order: Partial<TOrder>) {
        const updatedOrder = await api.put<TOrder>(`${this.path}${order.id}`, order);
        return updatedOrder.data
    }

    async getOrdersByStatus (statusId: number[]) {    
        const orders = await api.get<TOrderByStatus[]>(`${this.path}`, {
            params: {statuses: statusId.join(',')}
        })
        return orders.data;
    }

    async getOrderById (orderId: number): Promise<TOrder> {
        const order = await api.get<TOrder>(`${this.path}${orderId}`)
        return order.data
    }
    
    async getSources() {
        const sources = await api.get<OrderAssociations[]>(`${this.path}source`);
        return sources.data;
    }

    async getStatuses () {
        const statuses = await api.get<TStatus[]>(`${this.path}status`, {
            params: {id: '1,2,3,4,5,6,7'}
        });
        return statuses.data;
    }

    async getUsers () { 
        const users = await api.get<TUser[]>('user');
        return users.data
    }

    async getTags () {
        const tags = await api.get<TTag[]>(`${this.path}tag`);
        return tags.data;
    }

}

export const orderService = new OrderService();
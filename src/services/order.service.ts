import { TOrderAssociations } from "../types/order/order-associations";
import { TUser } from "types/user/user.type";
import { api } from "./api/axiosConfig";
import { TTag } from "types/order/tag.type";
import { TStatus } from "types/order/status.type";
import { TOrderByStatus } from "types/order/order-small.type";
import { TOrder } from "types/order/order.type";
import { TPaymentMethod } from "types/order/paymentMethod/payment-method.type";
import { ApiResponse } from '../types/api-response.interface';

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
        const sources = await api.get<TOrderAssociations[]>(`${this.path}source`);
        return sources.data;
    }

    async getStatuses(all?: boolean) {
        const params: { id: string; all?: boolean } = { id: '1,2,3,4,5,6,7' };
        if (all !== undefined) {
            params.all = all;
        }
    
        const statuses = await api.get<TStatus[]>(`${this.path}status`, { params });
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

    async getPaymentMethods () { 
        const paymentMethods = await api.get<ApiResponse<TPaymentMethod[]>>(`${this.path}payment`);
        return paymentMethods.data;
    }

}

export const orderService = new OrderService();
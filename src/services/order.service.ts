import axios from "axios";
import { BASE_ENDPOINT_DEV } from "../constans/baseEndPoint";
import { OrderAssociations } from "../interfaces/order/order-associations";

class OrderService {
    private baseUrl = `${BASE_ENDPOINT_DEV}order`;
    private urlToSource = `${this.baseUrl}/source`;
    
    async getSource () {
        const sources = await axios.get<OrderAssociations[]>(this.urlToSource);
        return sources.data;
    }

    async getStatus () {
        const statuses = await axios.get<OrderAssociations[]>(`${this.baseUrl}/status`);
        return statuses.data;
    }
}

export const orderService = new OrderService();
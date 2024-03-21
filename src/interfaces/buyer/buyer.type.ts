import { TOrder } from "interfaces/order/order.type";
import { TWarehouse } from "interfaces/order/warehouse.type";

export type TCustomer = {
    id: number
    full_name: string;
    phones: string[]; 
    email: string;
}

export type TBuyer = TCustomer & {
    id: number;
    recipients: TCustomer[];
    addresses: TWarehouse[];
    orders: TOrder[]
}
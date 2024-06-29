import { TOrder } from "types/order/order.type";
import { TWarehouse } from "types/order/addresses/api/warehouse.type";

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
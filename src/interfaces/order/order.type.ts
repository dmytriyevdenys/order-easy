import { TProduct } from "interfaces/products/products.type";
import { TStatus } from "./status.type";
import { TBuyer } from "interfaces/buyer/buyer.type";

export type TOrder = {
    id: number; 
    status: TStatus;
    orderCrm_id: string;
    order_id?:string;
    sender: any;
    shipping: any;
    source_id: number;
    manager_id: number;
    products:TProduct[];
    totalPrice: number;
    additionalnformation: string;
    payments: any;
    buyer: TBuyer;
    notes:string[];
    created_at: Date,
    updated_at: Date
}
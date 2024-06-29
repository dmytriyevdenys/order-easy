import { TProduct } from "types/products/products.type";
import { TStatus } from "./status.type";
import { TBuyer } from "types/buyer/buyer.type";
import { TPaymentMethod } from "./paymentMethod/payment-method.type";

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
    payment: TPaymentMethod;
    buyer: TBuyer;
    notes:string[];
    created_at: Date,
    updated_at: Date
}
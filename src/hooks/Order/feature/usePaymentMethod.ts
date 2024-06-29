import { TPaymentMethod } from "types/order/paymentMethod/payment-method.type";
import { useState } from "react";
import { useGetPaymentMethods } from "../useGetPaymentMethods";

export const usePaymentMethod = (totalPrice: number, currentPaymentMethod: TPaymentMethod) => {
    const { data: paymentMethods } = useGetPaymentMethods();
    const [paymentMethod, setPaymentMethod] = useState<TPaymentMethod>(currentPaymentMethod);
    
    return {
        paymentMethods,
        paymentMethod,
        setPaymentMethod
    };
};

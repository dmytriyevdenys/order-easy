import { TPaymentMethod } from "interfaces/order/paymentMethod/payment-method.type";
import { useState } from "react";

export const usePaymentMethod = (totalPrice: number, currentPaymentMethod?: TPaymentMethod) => {
    const paymentMethods: TPaymentMethod[] = [
        { label: 'На карту', value: totalPrice || 0 },
        { label: 'Наложка', value: 0 },
        { label: 'Аванс', value: 0 }
    ];
    
    const [paymentMethod, setPaymentMethod] = useState<TPaymentMethod>(currentPaymentMethod || { label: 'Наложка', value: 0 });
    return {
        paymentMethods,
        paymentMethod,
        setPaymentMethod
    };
};

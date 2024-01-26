import { useState } from "react";


type TPaymentMethod = {
    label: 'На карту' | 'Наложка' | 'Аванс';
    value: number;
};

export const usePaymentMethod = (totalPrice: number) => {
    const paymentMethods: TPaymentMethod[] = [
        { label: 'На карту', value: totalPrice || 0},
        {label: 'Наложка', value: 0},
        {label: 'Аванс', value: 0}
    ]
    const [paymentMethod, setPaymentMethod] = useState<TPaymentMethod>({label: 'Наложка', value: 0});

    return {
        paymentMethods,
        paymentMethod,
        setPaymentMethod
    }
}
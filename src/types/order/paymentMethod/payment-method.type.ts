import { TOrderAssociations } from "../order-associations";

export type TPaymentMethod = TOrderAssociations & {
    label: string;
};
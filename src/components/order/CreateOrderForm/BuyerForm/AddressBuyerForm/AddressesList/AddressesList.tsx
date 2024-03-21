import { TWarehouse } from "interfaces/order/warehouse.type";
import s from "./AddressesList.module.scss";
import { AddressListElement } from "./AddressListElement/AddressListElement";

type AddressListProps = {
    addresses: TWarehouse[]
}
export const AddressesList: React.FC<AddressListProps> = ({addresses}) => {
    console.log(addresses);
    
    return (
        <div className={s.container}>
            {addresses?.map(address => (
                <AddressListElement {...address}/>
            ))}
        </div>
    )
}
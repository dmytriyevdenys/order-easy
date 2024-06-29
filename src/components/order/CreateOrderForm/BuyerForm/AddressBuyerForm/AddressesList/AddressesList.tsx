import { TWarehouse } from "types/order/addresses/api/warehouse.type";
import s from "./AddressesList.module.scss";
import { AddressListElement } from "./AddressListElement/AddressListElement";

type AddressListProps = {
  addresses: TWarehouse[];
};
export const AddressesList: React.FC<AddressListProps> = (props) => {
  return (
    <div className={s.container}>
      {props.addresses?.map((address, index) => (
        <AddressListElement key={address.id} address={address} {...props} checked={index === 0}/>
      ))}
    </div>
  );
};

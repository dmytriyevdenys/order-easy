import { TWarehouse } from "interfaces/order/addresses/api/warehouse.type";
import s from "./AddressesList.module.scss";
import { AddressListElement } from "./AddressListElement/AddressListElement";

type AddressListProps = {
  addresses: TWarehouse[];
};
export const AddressesList: React.FC<AddressListProps> = (props) => {
  return (
    <div className={s.container}>
      {props.addresses?.map((address) => (
        <AddressListElement key={address.id} address={address} {...props} />
      ))}
    </div>
  );
};

import { TWarehouse } from "interfaces/order/addresses/api/warehouse.type";
import s from "./AddressBuyerForm.module.scss";
import { AddressBlock } from "./AddressBlock/AddressBlock";
import { ToggleBlockLabel } from "../ToggleBlockLabel/ToggleBlockLabel";
import { AddressesList } from "./AddressesList/AddressesList";
import { TAdressesProps } from "interfaces/order/addresses/adresses-props.type";

type AddressBuyerFormProps = TAdressesProps & {
  addresses?: TWarehouse[];
};
export const AddressBuyerForm: React.FC<AddressBuyerFormProps> = (props) => {
  return (
    <div className={s.container}>
      <ToggleBlockLabel
        label="Адреси"
        addButton
        active={!props.addresses?.length}
        addElement={<AddressBlock {...props} />}
        listElements={
          <AddressesList addresses={props?.addresses || []} />
        }
      />
    </div>
  );
};

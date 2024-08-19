import s from "./BuyerForm.module.scss";
import { TBuyer } from "types/buyer/buyer.type";
import { BlockLabel } from "./BlockLabel/BlockLabel";
import { AddressBuyerForm } from "./AddressBuyerForm/AddressBuyerForm";
import { BuyerRecipient } from "./BuyerRecipient/BuyerRecipient";
import { CustomerForm } from "./CustomerForm/CustomerForm";
import { TAdressesProps } from "types/order/addresses/adresses-props.type";

type BuyerFormProps = TAdressesProps & {
  buyer?: TBuyer;
};
export const BuyerForm: React.FC<BuyerFormProps> = ({
  buyer,
  searchSettlementProps,
  searchWarehouseProps,
}) => {
  const { full_name, phones } = buyer || {};  
  return (
    <div className={s.container}>
      <BlockLabel label="Покупець" copyButton/>
      <CustomerForm phones={phones} full_name={full_name} searchCustomer/>
      <AddressBuyerForm
        searchSettlementProps={searchSettlementProps}
        searchWarehouseProps={searchWarehouseProps}
        addresses={buyer?.addresses}
      />
      <BuyerRecipient recipients={buyer?.recipients || []}/>
    </div>
  );
};

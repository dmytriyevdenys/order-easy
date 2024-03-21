import s from "./BuyerForm.module.scss";
import { TBuyer } from "interfaces/buyer/buyer.type";
import { BlockLabel } from "./BlockLabel/BlockLabel";
import { AddressBuyerForm } from "./AddressBuyerForm/AddressBuyerForm";
import { useSearchSettlements } from "hooks/Order/feature/useSearchSettlements";
import { useSearchWarehouse } from "hooks/Order/feature/useSearchWarehouse";
import { BuyerRecipient } from "./BuyerRecipient/BuyerRecipient";
import { CustomerForm } from "./CustomerForm/CustomerForm";

type BuyerFormProps = {
  buyer?: TBuyer;
  searchSettlementProps: ReturnType<typeof useSearchSettlements>;
  searchWarehouseProps: ReturnType<typeof useSearchWarehouse>;
};
export const BuyerForm: React.FC<BuyerFormProps> = ({
  buyer,
  searchSettlementProps,
  searchWarehouseProps,
}) => {
  const { full_name, phones } = buyer || {};  
  return (
    <div className={s.container}>
      <BlockLabel label="Покупець" />
      <CustomerForm phones={phones} full_name={full_name}/>
      <AddressBuyerForm
        searchSettlementProps={searchSettlementProps}
        searchWarehouseProps={searchWarehouseProps}
        addresses={buyer?.addresses}
      />
      <BuyerRecipient recipients={buyer?.recipients || []}/>
    </div>
  );
};

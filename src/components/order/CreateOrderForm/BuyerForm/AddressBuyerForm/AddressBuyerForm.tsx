import { TWarehouse } from "interfaces/order/warehouse.type";
import s from "./AddressBuyerForm.module.scss";
import { useSearchSettlements } from "hooks/Order/feature/useSearchSettlements";
import { useSearchWarehouse } from "hooks/Order/feature/useSearchWarehouse";
import { AddressBlock } from "./AddressBlock/AddressBlock";
import { ToggleBlockLabel } from "../ToggleBlockLabel/ToggleBlockLabel";
import { AddressesList } from "./AddressesList/AddressesList";

type AddressBuyerFormProps = {
  addresses?: TWarehouse[];
  searchSettlementProps: ReturnType<typeof useSearchSettlements>;
  searchWarehouseProps: ReturnType<typeof useSearchWarehouse>;
};
export const AddressBuyerForm: React.FC<AddressBuyerFormProps> = ({
  addresses,
  searchSettlementProps,
  searchWarehouseProps,
}) => {    
  
  return (
    <div className={s.container}>
      <ToggleBlockLabel
        label="Адреси"
        addButton
        active={!addresses?.length}
        addElement={
          <AddressBlock
            searchSettlementProps={searchSettlementProps}
            searchWarehouseProps={searchWarehouseProps}
          />
        }
        listElements={<AddressesList addresses={addresses || []}/>}
      />
    </div>
  );
};

import { TWarehouse } from "interfaces/order/warehouse.type";
import s from "./AddressBuyerForm.module.scss";
import { BlockLabel } from "../BlockLabel/BlockLabel";
import { useSearchSettlements } from "hooks/Order/feature/useSearchSettlements";
import { useSearchWarehouse } from "hooks/Order/feature/useSearchWarehouse";
import { AbstractFormComponent } from "components/order/AbstractFormComponent/AbstractFormComponent";
import { SearchSettlements } from "components/order/SearchSettlements/SearchSettlements";
import { SearchWarehouse } from "components/order/SearchWarehouse/SearchWarehouse";
import { Radio } from "components/shared/ui/Radio/Radio";
import { AddressBlock } from "./AddressBlock/AddressBlock";

type AddressBuyerFormProps =  {
addresses?: TWarehouse[];
searchSettlementProps: ReturnType<typeof useSearchSettlements>;
searchWarehouseProps: ReturnType<typeof useSearchWarehouse>;
};
export const AddressBuyerForm: React.FC<AddressBuyerFormProps> = (
  { addresses, searchSettlementProps, searchWarehouseProps }
) => {
  return (
    <div className={s.container}>
      <BlockLabel label="Адреса" addButton />
      {!addresses?.length && (
        <div className={s.new_address_container}>
          <span>Нова адреса</span>
          <div className={s.choice_address_type}>
            <Radio label="Відділення" id="warehouse" checked />
            <Radio label="Адреса" id="address" />
          </div>
            <AddressBlock
              searchSettlementProps={searchSettlementProps}
              searchWarehouseProps={searchWarehouseProps}
            />
        </div>
      )}
    </div>
  );
};

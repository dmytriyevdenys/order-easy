import s from "./AddressBlock.module.scss";
import { AbstractFormComponent } from "components/order/AbstractFormComponent/AbstractFormComponent";
import { SearchSettlements } from "components/order/SearchSettlements/SearchSettlements";
import { SearchWarehouse } from "components/order/SearchWarehouse/SearchWarehouse";
import { Radio } from "components/shared/ui/Radio/Radio";
import { useSearchSettlements } from "hooks/Order/feature/useSearchSettlements";
import { useSearchWarehouse } from "hooks/Order/feature/useSearchWarehouse";

type AddressBlockProps = {
searchSettlementProps: ReturnType<typeof useSearchSettlements>;
searchWarehouseProps: ReturnType<typeof useSearchWarehouse>;
}
export const AddressBlock: React.FC<AddressBlockProps> = ({searchSettlementProps, searchWarehouseProps}) => {
    return (
        <div className={s.container}>
        <span>Нова адреса</span>
          <div className={s.choice_address_type}>
            <Radio label="Відділення" id="warehouse" checked />
            <Radio label="Адреса" id="address" />
          </div>
        <AbstractFormComponent
              label="Місто"
              Component={<SearchSettlements {...searchSettlementProps} />}
            />
            <AbstractFormComponent
              label="№ відділення"
              Component={<SearchWarehouse {...searchWarehouseProps} />}
            />
        </div>
    )
}
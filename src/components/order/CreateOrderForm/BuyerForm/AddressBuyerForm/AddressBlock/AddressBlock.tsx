import { AbstractFormComponent } from "components/order/AbstractFormComponent/AbstractFormComponent";
import { SearchSettlements } from "components/order/SearchSettlements/SearchSettlements";
import { SearchWarehouse } from "components/order/SearchWarehouse/SearchWarehouse";
import { useSearchSettlements } from "hooks/Order/feature/useSearchSettlements";
import { useSearchWarehouse } from "hooks/Order/feature/useSearchWarehouse";

type AddressBlockProps = {
searchSettlementProps: ReturnType<typeof useSearchSettlements>;
searchWarehouseProps: ReturnType<typeof useSearchWarehouse>;
}
export const AddressBlock: React.FC<AddressBlockProps> = ({searchSettlementProps, searchWarehouseProps}) => {
    return (
        <>
        <AbstractFormComponent
              label="Місто"
              Component={<SearchSettlements {...searchSettlementProps} />}
            />
            <AbstractFormComponent
              label="№ відділення"
              Component={<SearchWarehouse {...searchWarehouseProps} />}
            />
        </>
    )
}
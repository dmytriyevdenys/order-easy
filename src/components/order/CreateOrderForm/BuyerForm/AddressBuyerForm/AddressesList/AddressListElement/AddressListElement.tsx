import { TWarehouse } from "interfaces/order/addresses/api/warehouse.type";
import { ListElementBlockLabel } from "../../../ToggleBlockLabel/ListElementBlockLabel/ListElementBlockLabel";
import { EditElementBlockLabel } from "../../../ToggleBlockLabel/EditElementBlockLabel/EditElementBlockLabel";
import { SearchSettlements } from "components/order/SearchSettlements/SearchSettlements";
import { SearchWarehouse } from "components/order/SearchWarehouse/SearchWarehouse";
import { useSearchSettlements } from "hooks/Order/feature/useSearchSettlements";
import { useSearchWarehouse } from "hooks/Order/feature/useSearchWarehouse";
import { useState } from "react";

type AddressListElementProps = {
  address: TWarehouse;
  checked?: boolean;
};
export const AddressListElement: React.FC<AddressListElementProps> = ({
  address,
  checked,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const searchSettlementProps = useSearchSettlements(address);
  const searchWarehouseProps = useSearchWarehouse(
    searchSettlementProps.settlement?.Ref || "",
    address
  );
  const text = `${searchSettlementProps.settlement?.cityName}, відділення № ${searchWarehouseProps.warehouse?.Number}`;

  return (
    <>
      <ListElementBlockLabel
        text={text}
        toConfirm={() => {}}
        cancel={() => {}}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        checked={checked}
        editElement={
          <EditElementBlockLabel
            toConfirm={() => setIsEditing(false)}
            cancel={() => setIsEditing(false)}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <SearchSettlements {...searchSettlementProps} />
              <SearchWarehouse {...searchWarehouseProps} />
            </div>
          </EditElementBlockLabel>
        }
      />
    </>
  );
};

import React from "react";
import s from "./AddressBlock.module.scss";
import { AbstractFormComponent } from "components/order/AbstractFormComponent/AbstractFormComponent";
import { SearchSettlements } from "components/order/SearchSettlements/SearchSettlements";
import { SearchWarehouse } from "components/order/SearchWarehouse/SearchWarehouse";
import { Radio } from "components/shared/ui/Radio/Radio";
import { TAdressesProps } from "interfaces/order/addresses/adresses-props.type";
import { useRadioGroup } from "utils/useRadioGroup";

type AddressBlockProps = TAdressesProps;

export const AddressBlock: React.FC<AddressBlockProps> = ({
  searchSettlementProps,
  searchWarehouseProps,
}) => {
  const { selectedOption, handleChange } = useRadioGroup("warehouse");

  return (
    <div className={s.container}>
      <span>Нова адреса</span>
      <div className={s.choice_address_type}>
        <Radio
          label="Відділення"
          value="warehouse"
          id="warehouse"
          checked={selectedOption === "warehouse"}
          onChange={(e) => handleChange(e.target.value)}
        />
        <Radio
          label="Адреса"
          value="address"
          id="address"
          checked={selectedOption === "address"}
          onChange={(e) => handleChange(e.target.value)}
        />
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
  );
};

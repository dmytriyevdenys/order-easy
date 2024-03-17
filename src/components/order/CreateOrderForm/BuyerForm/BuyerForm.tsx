import s from "./BuyerForm.module.scss";
import { TBuyer } from "interfaces/buyer/buyer.type";
import { ReactComponent as SelectIcon } from "assets/icons/inputIcons/select-icon.svg";
import { AbstractFormComponent } from "components/order/AbstractFormComponent/AbstractFormComponent";
import { Input } from "components/shared/ui/Input/Input";
import { BlockLabel } from "./BlockLabel/BlockLabel";
import { AddressBuyerForm } from "./AddressBuyerForm/AddressBuyerForm";
import { useSearchSettlements } from "hooks/Order/feature/useSearchSettlements";
import { useSearchWarehouse } from "hooks/Order/feature/useSearchWarehouse";

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
      <AbstractFormComponent
        label="ПІБ"
        Component={<Input variant="default" value={full_name || ""} />}
      />
      {phones?.map((phone, index) => (
        <AbstractFormComponent
          key={index}
          label="Телефон"
          Component={<Input variant="default" value={phone || ""} />}
        />
      ))}
      <AddressBuyerForm
        searchSettlementProps={searchSettlementProps}
        searchWarehouseProps={searchWarehouseProps}
      />
    </div>
  );
};

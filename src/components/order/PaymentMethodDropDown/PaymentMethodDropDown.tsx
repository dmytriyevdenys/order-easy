import { DropDown } from "components/shared/ui/DropDown/DropDown";
import s from "./PaymentMethodDropDown.module.scss";
import { DropDownItem } from "components/shared/ui/DropDown/DropDownItem/DropDownItem";
import { usePaymentMethod } from "../../../hooks/Order/feature/usePaymentMethod";

type PaymentMethodDropDownProps = ReturnType<typeof usePaymentMethod>;

export const PaymentMethodDropDown: React.FC<PaymentMethodDropDownProps> = ({
  paymentMethod,
  paymentMethods,
  setPaymentMethod,
}) => {
  return (
    <>
      <DropDown
        showElement="input"
        value={paymentMethod.label}
        closeToClickElement
        below
        listWidth="200"
        readonlyInput
      >
        {paymentMethods.map((method, index) => (
          <DropDownItem
            key={index}
            data={method.label}
            onClick={() => setPaymentMethod({ ...method, label: method.label })}
          
          />
        ))}
      </DropDown>
    </>
  );
};

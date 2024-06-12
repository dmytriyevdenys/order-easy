import { DropDown } from "components/shared/ui/DropDown/DropDown";
import { DropDownItem } from "components/shared/ui/DropDown/DropDownItem/DropDownItem";
import { usePaymentMethod } from "../../../hooks/Order/feature/usePaymentMethod";
import { TPaymentMethod } from "interfaces/order/paymentMethod/payment-method.type";
import { AbstractFormComponent } from "../AbstractFormComponent/AbstractFormComponent";
import { Input } from "components/shared/ui/Input/Input";

type PaymentMethodDropDownProps = ReturnType<typeof usePaymentMethod> & {
  paymentMethod?: TPaymentMethod;
};

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
        listWidth="250"
        readonlyInput
        position={{top: 0, left: 0}}
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

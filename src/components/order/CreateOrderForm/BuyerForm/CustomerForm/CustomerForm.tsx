import { TCustomer } from "types/buyer/buyer.type";
import { AbstractFormComponent } from "components/order/AbstractFormComponent/AbstractFormComponent";
import { Input } from "components/shared/ui/Input/Input";
import { DropDown } from "components/shared/ui/DropDown/DropDown";
import { DropDownItem } from "components/shared/ui/DropDown/DropDownItem/DropDownItem";
import { useCustomerForm } from "hooks/Buyer/feature/useCustomerForm";

type CustomerFormProps = Partial<TCustomer> & {
  autoFocus?: boolean;
  searchCustomer?: boolean;
};
export const CustomerForm: React.FC<CustomerFormProps> = ({
  full_name,
  phones,
  email,
  autoFocus,
  searchCustomer,
}) => {
  const {
    valueFullName,
    phoneValues,
    showDropDown,
    isSuccess,
    buyersData,
    handleChangeFullName,
    setShowDropDown,
    handleOnChangePhone
  } = useCustomerForm(full_name, phones, searchCustomer);
  return (
    <div style={{ backgroundColor: "#ffff" }}>
      <AbstractFormComponent
        label="ПІБ"
        Component={
          <div style={{ position: "relative" }}>
            <Input
              variant="default"
              value={valueFullName}
              onChange={handleChangeFullName}
              autoFocus={autoFocus}
            />
            <DropDown
              show={showDropDown}
              closeDropDown={() => setShowDropDown(false)}
              closeToClickElement
              scrollHeight="100"
              listWidth="100%"
              below
            >
              {isSuccess &&
                buyersData?.map((buyer) => (
                  <DropDownItem
                    key={buyer.id}
                    data={`${buyer.full_name}, ${buyer.phones[0]}`}
                  />
                ))}
            </DropDown>
          </div>
        }
      />
      {phones?.length &&
        phoneValues?.map((phone, index) => (
          <AbstractFormComponent
            key={index}
            label="Телефон"
            Component={
              <Input
                variant="default"
                value={phone || ""}
                onChange={handleOnChangePhone(index)}
              />
            }
          />
        ))}
      {!phones?.length && (
        <AbstractFormComponent
          label="Телефон"
          Component={<Input variant="default" />}
        />
      )}
    </div>
  );
};

import { TCustomer } from "types/buyer/buyer.type";
import { AbstractFormComponent } from "components/order/AbstractFormComponent/AbstractFormComponent";
import { Input } from "components/shared/ui/Input/Input";
import { DropDown } from "components/shared/ui/DropDown/DropDown";
import { useBuyerSearch } from "hooks/Buyer/useBuyerSearch";
import { DropDownItem } from "components/shared/ui/DropDown/DropDownItem/DropDownItem";
import { useState } from "react";
import { useDebounce } from "utils/useDebounce";

type CustomerFormProps = Partial<TCustomer> & {
  autoFocus?: boolean;
}
export const CustomerForm: React.FC<CustomerFormProps> = ({
  full_name,
  phones,
  email,
  autoFocus
}) => {
  const [value, setValue] = useState<string>(full_name || "");
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const debounceValue = useDebounce(value, 1000);
  const { data: buyersData, isSuccess } = useBuyerSearch(debounceValue);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowDropDown(true);
    setValue(e.target.value);
  };
  
  return (
    <div  style={{backgroundColor: '#ffff'}}>
      <AbstractFormComponent
        label="ПІБ"
        Component={
          <div>
            <Input
              variant="default"
              value={value}
              onChange={handleOnChange}
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
                  <DropDownItem key={buyer.id} data={`${buyer.full_name}, ${buyer.phones[0]}`} />
                ))}
            </DropDown>
          </div>
        }
      />
      {phones?.length &&
        phones?.map((phone, index) => (
          <AbstractFormComponent
            key={index}
            label="Телефон"
            Component={<Input variant="default" value={phone || ""} />}
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

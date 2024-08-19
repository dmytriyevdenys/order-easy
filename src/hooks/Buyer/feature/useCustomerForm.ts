import { ChangeEvent, useState } from "react";
import { useDebounce } from "utils/useDebounce";
import { useBuyerSearch } from "../useBuyerSearch";

export const useCustomerForm = (
  full_name?: string,
  phones?: string[],
  searchCustomer?: boolean
) => {
  const [valueFullName, setValueFullName] = useState<string>(full_name || "");
  const [phoneValues, sestPhoneValues] = useState<string[]>(phones || []);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const debounceValue = useDebounce(valueFullName, 1000);
  const {
    data: buyersData,
    isSuccess,
    refetch,
  } = useBuyerSearch(debounceValue);

  const handleChangeFullName = (e: ChangeEvent<HTMLInputElement>) => {
    setShowDropDown(true);
    setValueFullName(e.target.value);
    searchCustomer && refetch();
  };

  const handleOnChangePhone =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const newPhoneValues = [...phoneValues];
      newPhoneValues[index] = value;
      sestPhoneValues(newPhoneValues);
    };
  return {
    setShowDropDown,
    handleChangeFullName,
    handleOnChangePhone,
    valueFullName,
    phoneValues,
    buyersData,
    isSuccess,
    showDropDown,
  };
};

import { useState } from "react";
import { useDebounce } from "utils/useDebounce";
import { useGetCity } from "../addresses/useGetCity";
import { TCity } from "types/order/addresses/api/city.type";
import { TWarehouse } from "types/order/addresses/api/warehouse.type";

export const useSearchSettlements = (address?: TWarehouse) => {
  const city: TCity = {
    cityName: address?.CityDescription || "",
    Description: address?.CityDescription || "",
    Ref: address?.Ref || "",
  };
  const [search, setSearch] = useState<string>("");
  const [settlement, setSettlement] = useState<TCity | null>(city || null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const debounceSearch = useDebounce(search, 500);
  const { data: citiesData, error } = useGetCity(debounceSearch, showDropDown);
  const handleInputClick = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.stopPropagation();
    settlement && setSearch(settlement.cityName);
    setShowDropDown(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setShowDropDown(true);
    setIsEditing(true);
  };

  const handleDropDownItemClick = (city: TCity) => {
    setSettlement(city);
    setIsEditing(false);
  };

  const handleOnBlur = () => {
    search.length === 0 && setSettlement(null);
    settlement && setSearch(settlement?.Description);
  };
  return {
    citiesData,
    showDropDown,
    isEditing,
    settlement,
    search,
    error,
    setShowDropDown,
    handleInputClick,
    handleInputChange,
    handleDropDownItemClick,
    handleOnBlur,
  };
};

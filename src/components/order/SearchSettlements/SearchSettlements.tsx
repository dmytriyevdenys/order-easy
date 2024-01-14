import { DropDown } from "components/shared/ui/DropDown/DropDown";
import s from "./SearchSettlements.module.scss";
import { useState } from "react";
import { useDebounce } from "utils/useDebounce";
import { Input } from "components/shared/ui/Input/Input";
import { useGetCity } from "hooks/Order/useGetCity";
import { DropDownItem } from "components/shared/ui/DropDown/DropDownItem/DropDownItem";
import { TCity } from "interfaces/order/city.type";

type SearchSettlementsProps = {
  settlements: string[];
};

export const SearchSettlements = () => {
  const [search, setSearch] = useState<string>("");
  const [settlement, setSettlement] = useState<TCity>();
  const [isEditing, setIsEditing] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const debounceSearch = useDebounce(search, 500);
  const { data: cityData, isSuccess } = useGetCity(debounceSearch, showDropDown);

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.stopPropagation();
    setShowDropDown(prev => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIsEditing(true);
  };

  const handleDropDownItemClick = (city: TCity) => {
    setSettlement(city);
    setIsEditing(false);
  };

  return (
    <div className={s.container}>
      <Input
        variant="search"
        onClick={handleInputClick}
        onChange={handleInputChange}
        value={isEditing ? search : settlement?.Description || ""}
      />
      <DropDown 
        show={showDropDown}
        closeDropDown={() => setShowDropDown(false)}
        closeToClickElement
      >
        {cityData &&
          cityData.map((city, index) => (
            <DropDownItem 
              key={index} 
              data={city.Description}
              onClick={() => handleDropDownItemClick(city)}
            />
          ))}
      </DropDown>
    </div>
  );
};

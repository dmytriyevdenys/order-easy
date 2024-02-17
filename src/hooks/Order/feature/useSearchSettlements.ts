import { useState } from "react";
import { useDebounce } from "utils/useDebounce";
import { useGetCity } from "../useGetCity";
import { TCity } from "interfaces/order/city.type";

export const useSearchSettlements = () => {
    const [search, setSearch] = useState<string>("");
    const [settlement, setSettlement] = useState<TCity>();
    const [isEditing, setIsEditing] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const debounceSearch = useDebounce(search, 500);
    const { data: cityData, error } = useGetCity(debounceSearch, showDropDown);
  
    const handleInputClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
      e.stopPropagation();
      settlement && setSearch(settlement.cityName);
      setShowDropDown(true);
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setShowDropDown(true)
      setIsEditing(true);
    };
  
    const handleDropDownItemClick = (city: TCity) => {
      setSettlement(city)            
      setIsEditing(false);
    };

    const handleOnBlur = () => {
       settlement && setSearch(settlement?.Description)
    }
    
    return {
        cityData,
        showDropDown,
        isEditing,
        settlement,
        search,
        error,
        setShowDropDown,
        handleInputClick,
        handleInputChange,
        handleDropDownItemClick,
        handleOnBlur
        
    }
}
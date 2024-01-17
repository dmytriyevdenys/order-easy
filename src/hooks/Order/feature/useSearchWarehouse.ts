import { TWarehouse } from "interfaces/order/warehouse.type";
import { useState } from "react"
import { useDebounce } from "utils/useDebounce";
import { useGetWarehouse } from "../useGetWarehouse";

export const useSearchWarehouse = (cityRef: string) => {
    const [search, setSearch] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [warehouse, SetWarehouse] = useState<TWarehouse>();
    const [showDropDown, setShowDropDown] = useState(false);
    const debounceSearch = useDebounce(search, 500);
    const {data: warehouseData} = useGetWarehouse(cityRef, debounceSearch);
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setShowDropDown(true)
        setIsEditing(true)
      };

      const handleDropDownItemClick = (warehouse: TWarehouse) => {
        SetWarehouse(warehouse);
        setIsEditing(false)
      };
  
    return {
        search,
        warehouseData,
        showDropDown,
        warehouse,
        isEditing,
        setShowDropDown,
        handleInputChange,
        handleDropDownItemClick
    }
}
import { TWarehouse } from "interfaces/order/addresses/api/warehouse.type";
import { useState } from "react"
import { useDebounce } from "utils/useDebounce";
import { useGetWarehouse } from "../addresses/useGetWarehouse";

export const useSearchWarehouse = (cityRef?: string, address?: TWarehouse) => {
    const [search, setSearch] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [warehouse, SetWarehouse] = useState<TWarehouse | null>(address || null);
    const [showDropDown, setShowDropDown] = useState(false);
    const debounceSearch = useDebounce(search, 500);
    const {data: warehouseData} = useGetWarehouse(cityRef || '', debounceSearch);
    
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
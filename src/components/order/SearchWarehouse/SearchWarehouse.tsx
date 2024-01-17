import { DropDown } from "components/shared/ui/DropDown/DropDown";
import { DropDownItem } from "components/shared/ui/DropDown/DropDownItem/DropDownItem";
import { Input } from "components/shared/ui/Input/Input"
import { useSearchWarehouse } from "hooks/Order/feature/useSearchWarehouse"

type SearchWarehouseProps = ReturnType<typeof useSearchWarehouse>;

export const SearchWarehouse: React.FC<SearchWarehouseProps> = ({
    search,
    warehouseData,
    showDropDown,
    warehouse,
    isEditing,
    setShowDropDown,
    handleInputChange,
    handleDropDownItemClick
}) => {

    return (
        <>
        <Input 
        variant='select' 
        value={isEditing ? search: warehouse?.Number}
        onChange={handleInputChange}
        onFocus={ handleInputChange}
        />
        <DropDown 
        closeDropDown={() => setShowDropDown(false)}
        show={showDropDown}
        closeToClickElement
        below
        scrollHeight="300"
        >
        {warehouseData?.map(warehouse => (
            <DropDownItem 
            key={warehouse.Ref}
             data={warehouse.Description}
             onClick={() => handleDropDownItemClick(warehouse)}
             />
        ))}
        </DropDown>
        </>
    )
}
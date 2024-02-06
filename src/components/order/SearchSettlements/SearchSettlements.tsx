import { DropDown } from "components/shared/ui/DropDown/DropDown";
import { Input } from "components/shared/ui/Input/Input";
import { DropDownItem } from "components/shared/ui/DropDown/DropDownItem/DropDownItem";
import { useSearchSettlements } from "hooks/Order/feature/useSearchSettlements";

type SearchSettlementsProps = ReturnType<typeof useSearchSettlements>

export const SearchSettlements: React.FC<SearchSettlementsProps> = ({
  cityData,
  showDropDown,
  isEditing,
  settlement,
  search,
  setShowDropDown,
  handleInputChange,
  handleDropDownItemClick,
  handleInputClick,
  handleOnBlur
}) => {

  return (
    <div >
      <Input
        variant='globe'
        onClick={handleInputClick}
        onChange={handleInputChange}
        onFocus={handleInputChange}
        value={isEditing ? search : settlement?.Description || ""}
        onBlur={handleOnBlur}
      />
      <DropDown 
        show={showDropDown}
        closeDropDown={() => setShowDropDown(false)}
        closeToClickElement
        scrollHeight="300"
        below
        listWidth="100%"
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

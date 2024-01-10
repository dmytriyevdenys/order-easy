import { ChangeEvent, SetStateAction } from "react";
import { DropDown } from 'components/shared/ui/DropDown/DropDown';
import { DropDownItem } from "components/shared/ui/DropDown/DropDownItem/DropDownItem";
import s from "./SourceDropDown.module.scss";
import { Input } from "components/shared/ui/Input/Input";
import { OrderAssociations } from "interfaces/order/order-associations";

type SourceDropDownProps = {
  showDropDown: boolean;
  handleShowDropDown: () => void;
  sourceName: string;
  handleOnChange: (value: ChangeEvent<HTMLInputElement>) => void;
  filteredData: OrderAssociations[] | undefined;
  handleSetSource: (source: OrderAssociations) => void;
  setSourceName: (name: string) => void
  setShowDropDown: (b: SetStateAction<boolean>) => void;
};
export const SourceDropDown: React.FC<SourceDropDownProps> = ({
  handleShowDropDown,
  handleOnChange,
  handleSetSource,
  setSourceName,
  setShowDropDown,
  showDropDown,
  sourceName,
  filteredData,
  
}) => {

  return (
    <div className={s.container}>
      <Input
        variant="select"
        onClick={handleShowDropDown}
        onChange={(e) => handleOnChange(e)}
        value={sourceName}
        onFocus={() => setSourceName("")}
      />
      <DropDown
        closeToClickElement
        value={sourceName}
        show={showDropDown}
        closeDropDown={() => setShowDropDown(false)}
        listWidth="190"
      >
        {" "}
        <div className={s.list}>
          {filteredData?.map((source) => (
            <DropDownItem
              key={source.id}
              data={source.name}
              onClick={() => handleSetSource(source)}
            />
          ))}
        </div>
      </DropDown>
    </div>
  );
};

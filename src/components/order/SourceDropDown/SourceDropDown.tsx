import { DropDown } from 'components/shared/ui/DropDown/DropDown';
import { DropDownItem } from "components/shared/ui/DropDown/DropDownItem/DropDownItem";
import s from "./SourceDropDown.module.scss";
import { Input } from "components/shared/ui/Input/Input";
import { useSourceDropDown } from "hooks/Order/feature/useSourceDropDown";

type SourceDropDownProps = ReturnType<typeof useSourceDropDown>;

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
        placeholder='Оберіть джерело'
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

import { DropDown } from "../../shared/ui/DropDown/DropDown";
import { DropDownItem } from "../../shared/ui/DropDown/DropDownItem/DropDownItem";
import s from "./DropDownPerPage.module.scss"

type DropDownPerPageProps = {
  onPerPageChange: (n: number) => void;
  per_page: number;
};
export const DropDownPerPage: React.FC<DropDownPerPageProps> = ({
  per_page,
  onPerPageChange,
}) => {
  const perPageItems = [20, 50, 100];  
  return (
    <div className={s.drop_down}>
      <DropDown showElement='input' readonlyInput value={per_page} closeToClickElement >
        {perPageItems.map((perPageItem, index) => (
          <DropDownItem 
          key={index}
           data={perPageItem}
           onClick={() => onPerPageChange(perPageItem)}
           defaultValue={20}
           />
        ))}
      </DropDown>
    </div>
  );
};

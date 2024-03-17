import s from "./BlockLabel.module.scss";
import { ReactComponent as SelectIcon } from "assets/icons/inputIcons/select-icon.svg";
import {ReactComponent as AddIcon} from "assets/icons/buttonIcons/add-icon.svg";

type BlockLabelProps = {
  label: string;
  addButton?: boolean;
};
export const BlockLabel: React.FC<BlockLabelProps> = ({ label, addButton }) => {
  const classContainer = addButton ? s.full_and_button : s.default;
  return (
    <div className={s.container}>
      <div className={classContainer}>
        <span>{label}</span>
        <div className={s.icon_container}>
          <SelectIcon className={s.icon} />
        </div>
      </div>
      {addButton && <div className={s.add_icon_container}><AddIcon className={s.add_icon}/></div>}
    </div>
  );
};

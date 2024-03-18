import s from "./BlockLabel.module.scss";
import { ReactComponent as SelectIcon } from "assets/icons/inputIcons/select-icon.svg";
import { ReactComponent as AddIcon } from "assets/icons/buttonIcons/add-icon.svg";
import { ToggleBlockLabelProps } from "../ToggleBlockLabel/ToggleBlockLabel";


export const BlockLabel: React.FC<Omit<ToggleBlockLabelProps, 'children'>> = ({
  label,
  addButton,
  active,
  clickToAddButton,
  clickToLabel
}) => {
  const buttonClass = addButton ? s.full_and_button : s.default;
  const activeButtonClass = active ? s.active_button : "";
  return (
    <div className={s.container}>
      <div className={buttonClass} onClick={clickToLabel}>
        <span>{label}</span>
        <div className={s.icon_container}>
          <SelectIcon className={s.icon} />
        </div>
      </div>
      {addButton && (
        <div className={`${s.add_icon_container} ${activeButtonClass}`} onClick={clickToAddButton}>
          <AddIcon className={`${s.add_icon} ${activeButtonClass}`} />
        </div>
      )}
    </div>
  );
};

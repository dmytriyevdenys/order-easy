import s from "./BlockLabel.module.scss";
import { ReactComponent as SelectIcon } from "assets/icons/inputIcons/select-icon.svg";
import { ToggleBlockLabelProps } from "../ToggleBlockLabel/ToggleBlockLabel";
import { ButtonMini } from "components/shared/ui/Buttons/ButtonMini/ButtonMini";


export const BlockLabel: React.FC<Omit<ToggleBlockLabelProps, 'addElement'>> = ({
  label,
  addButton,
  active,
  clickToAddButton,
  clickToLabel
}) => {
  const buttonClass = addButton ? s.full_and_button : s.default;
  return (
    <div className={s.container}>
      <div className={buttonClass} onClick={clickToLabel}>
        <span>{label}</span>
        <div className={s.icon_container}>
          <SelectIcon className={s.icon} />
        </div>
      </div>
      {addButton && (
        <ButtonMini active={active || false} clickToAddButton={clickToAddButton}/>
      )}
    </div>
  );
};

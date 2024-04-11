import { Radio } from "components/shared/ui/Radio/Radio";
import s from "./ListElementBlockLabel.module.scss";
import { EditButton } from "components/shared/ui/Buttons/EditButton/EditButton";

import { CloseButton } from "components/shared/ui/Buttons/CloseButton/CloseButton";
import { CopyButton } from "components/shared/ui/Buttons/CopyButton/CopyButton";
import { DropDown } from "components/shared/ui/DropDown/DropDown";
import { useProductManagment } from "hooks/Product/feature/useProductManagment";
import { useActiveOverlay } from "utils/useActiveOverlay";

type ListElementBlockLabelProps = {
  text: string;
  toConfirm: () => void;
  cancel: () => void;
  editElement?: React.ReactNode;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing?: boolean;
  checked?: boolean;
};
export const ListElementBlockLabel: React.FC<ListElementBlockLabelProps> = ({
  text,
  toConfirm,
  cancel,
  editElement,
  setIsEditing,
  isEditing,
  checked
}) => {
 useActiveOverlay(Boolean(isEditing));


  const handleEditing = () => {
    setIsEditing && setIsEditing(prev => !prev);
  }
  return (
    <div className={s.container}>
      <div className={s.block}>
        <div className={s.info_block}>
          <Radio label={text} id={text} colorDefault checked={checked}/>
          <CopyButton copyValue={text} className={s.icons} />
        </div>
        <div className={s.icons}>
          <EditButton
            isActive={isEditing}
            onClick={handleEditing}
          />
          <CloseButton toConfirm={toConfirm} cancel={cancel} />
        </div>
      </div>
      {isEditing && (
        <DropDown
          closeDropDown={() => setIsEditing && setIsEditing(false)}
          show={isEditing}
          below
          listWidth="90%"
          notCloseClickToOutside={true}
          position={{ top: -10, left: -45 }}
        >
          {editElement}
        </DropDown>
      )}{" "}
    </div>
  );
};

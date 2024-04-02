import { Radio } from "components/shared/ui/Radio/Radio";
import s from "./ListElementBlockLabel.module.scss";
import { EditButton } from "components/shared/ui/Buttons/EditButton/EditButton";
import { useState } from "react";
import { CloseButton } from "components/shared/ui/Buttons/CloseButton/CloseButton";
import { CopyButton } from "components/shared/ui/Buttons/CopyButton/CopyButton";
import { DropDown } from "components/shared/ui/DropDown/DropDown";

type ListElementBlockLabelProps = {
  text: string;
  toConfirm: () => void;
  cancel: () => void;
  editElement?: React.ReactNode;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing?: boolean;
};
export const ListElementBlockLabel: React.FC<ListElementBlockLabelProps> = ({
  text,
  toConfirm,
  cancel,
  editElement,
  setIsEditing,
  isEditing,
}) => {
  return (
    <div className={s.container}>
      <div className={s.block}>
        <div className={s.info_block}>
          <Radio label={text} id={text} colorDefault />
          <CopyButton copyValue={text} className={s.icons} />
        </div>
        <div className={s.icons}>
          <EditButton
            isActive={isEditing}
            onClick={() => setIsEditing && setIsEditing((prev) => !prev)}
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

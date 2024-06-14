import { Radio } from "components/shared/ui/Radio/Radio";
import s from "./ListElementBlockLabel.module.scss";
import { EditButton } from "components/shared/ui/Buttons/EditButton/EditButton";
import { CloseButton } from "components/shared/ui/Buttons/CloseButton/CloseButton";
import { CopyButton } from "components/shared/ui/Buttons/CopyButton/CopyButton";
import { DropDown } from "components/shared/ui/DropDown/DropDown";
import { useActiveOverlay } from "utils/useActiveOverlay";
import { useState } from "react";

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
  checked,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  useActiveOverlay(Boolean(isEditing));

  const handleEditing = () => {
    setIsEditing && setIsEditing((prev) => !prev);
  };

  const handleOnMouseLeave = () => {
    if (!buttonClicked && !isEditing) {
      setButtonClicked(false);
      setIsHover(false);
    }
  };

  const handleButtonClick = (button: "edit" | "close") => {
    setButtonClicked((prev) => !prev);
    setIsHover(true);
    button === "edit" && handleEditing();
  };
  const containerClass = isHover && s.hover;  
  return (
    <div
      className={`${s.container} ${containerClass}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={handleOnMouseLeave}
    >
      <div className={s.block}>
        <div className={s.info_block}>
          <Radio label={text} id={text} colorDefault checked={checked} />
          {isHover && <CopyButton copyValue={text} className={s.icons} />}
        </div>
        {isHover && (
          <div className={s.icons}>
            <EditButton
              isActive={isEditing}
              onClick={() => handleButtonClick("edit")}
            />
            <CloseButton
              toConfirm={() => setIsHover(false)}
              cancel={() => setIsHover(false)}
              onClick={() => handleButtonClick("close")}
            />
          </div>
        )}
      </div>
      {isEditing && (
        <DropDown
          closeDropDown={() => setIsEditing && setIsEditing(false)}
          show={isEditing}
          below
          listWidth="300px"
          notCloseClickToOutside={true}
          position={{ top: -40, left: 0 }}
        >
          {editElement}
        </DropDown>
      )}{" "}
    </div>
  );
};

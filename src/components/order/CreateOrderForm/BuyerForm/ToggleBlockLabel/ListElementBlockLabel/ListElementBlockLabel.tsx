import { Radio } from "components/shared/ui/Radio/Radio";
import s from "./ListElementBlockLabel.module.scss";
import { EditButton } from "components/shared/ui/Buttons/EditButton/EditButton";
import { useState } from "react";
import { CloseButton } from "components/shared/ui/Buttons/CloseButton/CloseButton";

type ListElementBlockLabelProps = {
  text: string;
  toConfirm: () => void;
  cancel: () => void;
  editElement?: React.ReactNode;
};
export const ListElementBlockLabel: React.FC<ListElementBlockLabelProps> = ({
  text,
  toConfirm,
  cancel,
  editElement,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  console.log(isEditing);
  
  return (
    <div className={s.container}>
      <Radio label={text} id={text} colorDefault />
      <div className={s.icons}>
        <EditButton onClick={() => setIsEditing((prev) => !prev)} />
        <CloseButton toConfirm={toConfirm} cancel={cancel} />
      </div>
      {isEditing && <div className={s.edit_element}>{editElement}</div>}
    </div>
  );
};

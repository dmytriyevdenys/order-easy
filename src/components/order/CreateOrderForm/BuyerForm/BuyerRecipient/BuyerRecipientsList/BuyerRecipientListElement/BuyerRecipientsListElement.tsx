import s from "./BuyerRecipientsListElement.module.scss";
import { TCustomer } from "interfaces/buyer/buyer.type";
import { ListElementBlockLabel } from "../../../ToggleBlockLabel/ListElementBlockLabel/ListElementBlockLabel";
import { Input } from "components/shared/ui/Input/Input";
import { EditElementBlockLabel } from "../../../ToggleBlockLabel/EditElementBlockLabel/EditElementBlockLabel";
import { useState } from "react";

type BuyerRecipientsListElementProps = {
  recipient: TCustomer;
  checked?: boolean;
}
export const BuyerRecipientsListElement: React.FC<BuyerRecipientsListElementProps> = ({ recipient, checked }) => {
  const { full_name, phones } = recipient;
  const text = `${full_name}, ${phones[0]}`;
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      <ListElementBlockLabel
        text={text}
        toConfirm={() => {}}
        cancel={() => {}}
        checked={checked}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editElement={
          <EditElementBlockLabel toConfirm={() => setIsEditing(false)} cancel={() => setIsEditing(false)}>
            <div className={s.inputs}>
              <Input variant="default" value={recipient.full_name} />
              <Input variant="default" value={recipient.phones[0]} />
            </div>
          </EditElementBlockLabel>
        }
      />
    </>
  );
};

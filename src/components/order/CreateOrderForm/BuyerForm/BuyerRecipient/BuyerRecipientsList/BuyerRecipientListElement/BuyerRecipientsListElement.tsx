import { TCustomer } from "types/buyer/buyer.type";
import { ListElementBlockLabel } from "../../../ToggleBlockLabel/ListElementBlockLabel/ListElementBlockLabel";
import { EditElementBlockLabel } from "../../../ToggleBlockLabel/EditElementBlockLabel/EditElementBlockLabel";
import { useState } from "react";
import { CustomerForm } from "../../../CustomerForm/CustomerForm";

type BuyerRecipientsListElementProps = {
  recipient: TCustomer;
  checked?: boolean;
};
export const BuyerRecipientsListElement: React.FC<
  BuyerRecipientsListElementProps
> = ({ recipient, checked }) => {
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
          <EditElementBlockLabel
            toConfirm={() => setIsEditing(false)}
            cancel={() => setIsEditing(false)}
          >
            <CustomerForm full_name={full_name} phones={phones}/>
          </EditElementBlockLabel>
        }
      />
    </>
  );
};

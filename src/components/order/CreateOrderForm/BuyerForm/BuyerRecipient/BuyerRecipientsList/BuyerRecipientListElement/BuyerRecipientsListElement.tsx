import s from "./BuyerRecipientsListElement.module.scss";
import { TCustomer } from "interfaces/buyer/buyer.type";
import { ListElementBlockLabel } from "../../../ToggleBlockLabel/ListElementBlockLabel/ListElementBlockLabel";
import { Input } from "components/shared/ui/Input/Input";
import { EditElementBlockLabel } from "../../../ToggleBlockLabel/EditElementBlockLabel/EditElementBlockLabel";

export const BuyerRecipientsListElement: React.FC<TCustomer> = (recipient) => {
  const { full_name, phones } = recipient;
  const text = `${full_name}, ${phones[0]}`;
  return (
    <>
      <ListElementBlockLabel
        text={text}
        toConfirm={() => {}}
        cancel={() => {}}
        editElement={
          <EditElementBlockLabel toConfirm={() => {}} cancel={() => {}}>
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

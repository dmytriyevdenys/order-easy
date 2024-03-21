import { TCustomer } from "interfaces/buyer/buyer.type";
import { CustomerForm } from "../CustomerForm/CustomerForm";
import { ToggleBlockLabel } from "../ToggleBlockLabel/ToggleBlockLabel";
import { BuyerRecipientsList } from "./BuyerRecipientsList/BuyerRecipientsList";

type BuyerRecipientProps = {
  recipients: TCustomer[];
};
export const BuyerRecipient: React.FC<BuyerRecipientProps> = ({
  recipients,
}) => {
  return (
    <div>
      <ToggleBlockLabel
        label="Інший отримувач"
        addButton
        addElement={<CustomerForm />}
        listElements={<BuyerRecipientsList recipients={recipients} />}
      />
    </div>
  );
};

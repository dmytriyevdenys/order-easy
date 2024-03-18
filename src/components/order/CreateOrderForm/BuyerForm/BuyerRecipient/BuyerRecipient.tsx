import { TCustomer } from "interfaces/buyer/buyer.type";
import { BlockLabel } from "../BlockLabel/BlockLabel";
import { CustomerForm } from "../CustomerForm/CustomerForm";
import { ToggleBlockLabel } from "../ToggleBlockLabel/ToggleBlockLabel";

type BuyerRecipientProps = {
    recipients: TCustomer[]
}
export const BuyerRecipient: React.FC<BuyerRecipientProps> = ({ recipients }) => {

    return (
        <div>
            <ToggleBlockLabel label="Інший отримуач" addButton>
            <CustomerForm/>
            </ToggleBlockLabel>
        </div>
    )
}
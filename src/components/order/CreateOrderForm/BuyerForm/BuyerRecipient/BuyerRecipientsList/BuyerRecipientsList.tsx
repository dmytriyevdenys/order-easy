import { TCustomer } from "interfaces/buyer/buyer.type"
import { BuyerRecipientsListElement } from "./BuyerRecipientListElement/BuyerRecipientsListElement"

type BuyerRecipientsListProps = {
    recipients: TCustomer[]
}
export const BuyerRecipientsList: React.FC<BuyerRecipientsListProps> = ({ recipients }) => {
    return (
        <>
        {recipients?.map(recipient => (
            <BuyerRecipientsListElement key={recipient.id} {...recipient}/>
        ))}
        </>
    )
}
import { TCustomer } from "types/buyer/buyer.type"
import { BuyerRecipientsListElement } from "./BuyerRecipientListElement/BuyerRecipientsListElement"

type BuyerRecipientsListProps = {
    recipients: TCustomer[]
}
export const BuyerRecipientsList: React.FC<BuyerRecipientsListProps> = ({ recipients }) => {
    return (
        <>
        {recipients?.map((recipient, index) => (
            <BuyerRecipientsListElement key={recipient.id} recipient={recipient} checked={index === 0}/>
        ))}
        </>
    )
}
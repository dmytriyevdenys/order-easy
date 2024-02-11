import { PostComponentContainer } from "../PostComponentContainer/ PostComponentContainer"
import { OpenRecipient } from "./OpenRecipient/OpenRecipient"

export const Recipient: React.FC = () => {
    return (
        <div>
            <PostComponentContainer text="Отримувач"><OpenRecipient/></PostComponentContainer>
                     </div>
    )
}
import { PostComponentContainer } from "../PostComponentContainer/ PostComponentContainer"
import { ReactComponent as ArrovIcon } from "assets/icons/orderIcons/arrow.svg";

export const Recipient: React.FC = () => {
    return (
        <div>
            <PostComponentContainer>
                <span>Отримувач</span>
                <ArrovIcon/>
            </PostComponentContainer>
        </div>
    )
}
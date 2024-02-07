import { PostComponentContainer } from "../PostComponentContainer/ PostComponentContainer"
import { ReactComponent as ArrovIcon } from "assets/icons/orderIcons/arrow.svg";
import { OpenCargoInfo } from "./OpenCargoInfo/OpenCargoInfo";

export const CargoInfo: React.FC = () => {
    return (
        <div>
            <PostComponentContainer>
                <span>Інформація про вантаж</span>
                <ArrovIcon/>
            </PostComponentContainer>
            <OpenCargoInfo/>
        </div>
    )
}
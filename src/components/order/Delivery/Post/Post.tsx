import s from "./Post.module.scss";
import {ReactComponent as NovaPostIcon} from "assets/icons/orderIcons/Nova_Poshta.svg";
export const Post: React.FC = () => {
    return (
        <div className={s.container}>
            <div className={s.buttons_container}>
                <div className={s.post}>
                    <NovaPostIcon/>
                </div>
            </div>
        </div>
    )
}
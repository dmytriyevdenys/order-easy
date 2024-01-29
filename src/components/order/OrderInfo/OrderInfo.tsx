import s from "./OrderInfo.module.scss";
import { SwitchInfoButton } from "./SwitchInfoButton/SwitchInfoButton.";
import { ReactComponent as NoteIcon } from "assets/icons/orderIcons/NoteIcon.svg"
import { ReactComponent as RecentIcon } from "assets/icons/orderIcons/RecentIcon.svg"

export const OrderInfo: React.FC = () => {

    return (
        <div className={s.container}>
                    <div className={s.buttons_container}>
                        <SwitchInfoButton text="Записи" icon={<NoteIcon/>}/>
                        <SwitchInfoButton text="Історія змін" icon={<RecentIcon/>}/>
                    </div>
        </div>
    )
}
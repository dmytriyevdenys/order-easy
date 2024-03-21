import s from "./ButtonMini.module.scss";
import { ReactComponent as AddIcon } from "assets/icons/buttonIcons/add-icon.svg";

type ButtonMiniProps = {
    active: boolean;
    clickToAddButton?: () => void;
}
export const ButtonMini: React.FC<ButtonMiniProps> = ({ active, clickToAddButton }) => {
    const activeButtonClass = active ? s.active_button : "";

    return (
    <div className={`${s.container} ${activeButtonClass}`} onClick={clickToAddButton}>
    <AddIcon className={`${s.add_icon} ${activeButtonClass}`} />
    </div>
    )
}
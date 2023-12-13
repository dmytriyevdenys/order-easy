import s from "./SideBar.module.scss";
import {ReactComponent as LogoIcon} from "../../assets/icons/logo.svg"
export const SideBar: React.FC = () => {
    return (
        <div className={s.container}>
            <div className={s.logo_container}><LogoIcon className={s.logo}/></div>
        </div>
    )
}
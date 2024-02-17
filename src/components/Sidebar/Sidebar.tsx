import s from "./SideBar.module.scss";
import {ReactComponent as LogoIcon} from "../../assets/icons/logo.svg";
import {ReactComponent as OrderIcon} from "../../assets/icons/orderIcons/order-page-icon.svg";
import {ReactComponent as PackerIcon} from "../../assets/icons/packer-icon.svg"
import { NavLink } from "react-router-dom";
export const SideBar: React.FC = () => {
    return (
        <nav className={s.container}>
            <div className={s.logo_container}><LogoIcon className={s.logo}/></div>
           <ul className={s.list_container}>
          <NavLink to={'/orders'}><li className={s.list_item}> <OrderIcon className={`${s.list_item} ${s.order_icon}`}/></li></NavLink>
          <NavLink to={'/packer'}><li className={s.list_item}><PackerIcon/></li></NavLink>
            </ul> 
            </nav>
    )
}
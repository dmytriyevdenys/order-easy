import s from "./SideBar.module.scss";
import {ReactComponent as LogoIcon} from "../../assets/icons/logo.svg";
import {ReactComponent as OrderIcon} from "../../assets/icons/orderIcons/order-page-icon.svg";
import {ReactComponent as PackerIcon} from "../../assets/icons/packer-icon.svg"
import { NavLink } from "react-router-dom";
import { ORDERS_ROUTE, PACKER_ROUTE } from "config/routes";
import { Can, defineAbilityFor } from "utils/ability";
import { TUser } from "types/user/user.type";
export const SideBar: React.FC = () => {
    const currentUser = {
        role: {
          accepted_all: false,
          permissions: [
            { name: 'create_order', group_name: 'orders' },
            { name: 'manage_catalog', group_name: 'catalog' },
            { name: 'delete_order', group_name: 'orders' },
          ],
        },
      }; 
      const ability = defineAbilityFor(currentUser as TUser);
    return (
        <nav className={s.container}>
            <div className={s.logo_container}><LogoIcon className={s.logo}/></div>
           <ul className={s.list_container}>
            <Can I='create_order' a='orders' ability={ability}>
                    <div>FFF</div>
            </Can>
          <NavLink to={ORDERS_ROUTE}><li className={s.list_item}> <OrderIcon className={`${s.list_item} ${s.order_icon}`}/></li></NavLink>
          <NavLink to={PACKER_ROUTE}><li className={s.list_item}><PackerIcon/></li></NavLink>
            </ul> 
            </nav>
    )
}
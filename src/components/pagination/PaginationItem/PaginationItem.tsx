import s from "./PaginationItem.module.scss"
import { ReactComponent as Icon } from "../../../assets/icons/inputIcons/select-icon.svg"
import { ButtonHTMLAttributes } from 'react';
type ItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    pageNumber?: string | number,
    typeIcon?: "left" | "rigth"
}
export const PaginationItem: React.FC<ItemProps> = ({pageNumber,children ,disabled, typeIcon,  ...props}) => {
    const disabledClass = disabled ? s.disabled : '';
    const iconClass = typeIcon ?  s[typeIcon]: '';
    if (!pageNumber) 
    return <button className={disabled ? disabledClass : `${s.icon} ${iconClass}`} disabled={disabled} {...props}><Icon/></button>
    return (
        <button className={s.item} {...props} >
        {pageNumber}
        </button>
    )
}
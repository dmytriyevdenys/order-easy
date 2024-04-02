import { HtmlHTMLAttributes, useState } from "react";
import s from "./EditButton.module.scss";
import { ReactComponent as EditIcon } from 'assets/icons/orderIcons/editIcon.svg';

export const EditButton: React.FC<HtmlHTMLAttributes<HTMLDivElement> & {isActive?: boolean}> = ({isActive, ...props}) => {
    const activeClass = isActive ? s.active : ''
    return (
        <div className={`${s.container} ${activeClass}`} {...props}>
            <EditIcon  className={`${s.icon} ${activeClass}`}/>
        </div>
    )
}
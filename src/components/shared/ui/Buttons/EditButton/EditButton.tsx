import { HtmlHTMLAttributes, useState } from "react";
import s from "./EditButton.module.scss";
import { ReactComponent as EditIcon } from 'assets/icons/orderIcons/editIcon.svg';

export const EditButton: React.FC<HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
    const [isActive, setIsActive] = useState(false);

    const handleSetIsActive = () => {
        setIsActive(prev => !prev);
    }
    const activeClass = isActive ? s.active : ''
    return (
        <div className={`${s.container} ${activeClass}`} {...props}>
            <EditIcon onClick ={handleSetIsActive} className={`${s.icon} ${activeClass}`}/>
        </div>
    )
}
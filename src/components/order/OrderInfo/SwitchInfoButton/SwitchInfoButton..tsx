import { ReactNode, useState } from "react";
import s from "./SwitchInfoButton.module.scss";

type SwitchInfoButtonProps = {
    text: string;
    icon: ReactNode;
}
export const SwitchInfoButton: React.FC<SwitchInfoButtonProps> = ({text, icon}) => {
    const [isActive, setIsActive] = useState(false);
    const activeClass = isActive ? s.active: ''
    return (
        <div className={`${s.container} ${activeClass}`}>
              {icon}
            <span className={s.span}>{text}</span>
        </div>
    )
}
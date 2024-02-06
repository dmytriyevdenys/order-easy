import { ReactNode } from "react";
import s from "./SwitchInfoButton.module.scss";

type SwitchInfoButtonProps =  {
    text: string;
    icon: ReactNode;
    OnClick: () => void;
    selected: boolean;
}
export const SwitchInfoButton: React.FC<SwitchInfoButtonProps> = ({text, icon, selected, OnClick}) => {
    const activeClass = selected ? s.active: '';    
    return (
        <div className={`${s.container} ${activeClass}`} onClick={() => OnClick()}>
              {icon}
            <span className={s.span}>{text}</span>
        </div>
    )
}
import { ReactNode } from "react";
import s from "./SwitchInfoButton.module.scss";

type SwitchInfoButtonProps =  {
    text: string;
    icon?: ReactNode;
    width?: string
    OnClick: () => void;
    selected: boolean;
}
export const SwitchInfoButton: React.FC<SwitchInfoButtonProps> = ({text, icon, selected, width, OnClick}) => {
    const activeClass = selected ? s.active: '';
    return (
        <div className={`${s.container} ${activeClass}`} onClick={() => OnClick()} style={{width}}>
              {icon}
            <span className={s.span}>{text}</span>
        </div>
    )
}
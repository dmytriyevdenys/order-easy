import { useState } from "react";
import { BlockLabel } from "../BlockLabel/BlockLabel";
import s from "./ToggleBlockLabel.module.scss";

export type ToggleBlockLabelProps = {
    label: string;
    addButton?: boolean;
    active?: boolean;
    clickToAddButton?: () => void;
    clickToLabel?: () => void;
    children: React.ReactNode
}
export const ToggleBlockLabel: React.FC<ToggleBlockLabelProps> = ({children, ...props}) => {
const {active} = props;
const [isOpen, setIsOpen] = useState(active || false);

const toogleIsOpen = () => {
    setIsOpen(prev => !prev);
}
    return (
        <div className={s.container}>
            <BlockLabel {...props} clickToAddButton={toogleIsOpen} active={isOpen}/>
            {isOpen && children}
        </div>
    )
}
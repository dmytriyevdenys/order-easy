import s from "./DropDown.module.scss"
import { HTMLAttributes, ReactNode,} from "react";

type DropDownProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    active?: boolean;
    onToggle?: () => void;
}

export const DropDown: React.FC<DropDownProps> = ({ children }) => {
    return (
        <div className={s.container} >
            <ul className={s.list}>
                {children}
            </ul>
        </div>
    );
};

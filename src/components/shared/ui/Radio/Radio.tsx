import { InputHTMLAttributes } from "react";
import s from "./Radio.module.scss";

type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
}
export const Radio: React.FC<RadioProps> = ({label, id,...props}) => {
    return (
        <div className={s.container}>
            <input className={s.input} type='radio' id={id} {...props} />
            <label className={s.label} htmlFor={id}>{label}</label>
        </div>
    )
}
import { InputHTMLAttributes } from "react";
import s from "./Radio.module.scss";

type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    colorDefault?: boolean
}
export const Radio: React.FC<RadioProps> = ({label, id, colorDefault,...props}) => {

    return (
        <div className={s.container}>
            <input className={s.input} type='radio' id={id} {...props} />
            <label className={colorDefault ? s.label_defult : s.label} htmlFor={id}>{label}</label>
        </div>
    )
}
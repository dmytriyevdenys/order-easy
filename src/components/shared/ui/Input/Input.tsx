import { InputHTMLAttributes } from "react"
import s from "./Input.module.scss"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    variant: 'default' | 'globe' | 'grivnja'  
}
export const Input: React.FC<InputProps> = ({variant, children, ...props}) => {
const inputClass = s[variant]
    return <input className={`${s} ${inputClass}`} {...props}>{children}</input>
}
import React, { ButtonHTMLAttributes } from "react"
import s from './Button.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    color: "primary" | "secondary",

}

export const Button: React.FC<ButtonProps> = ({color, children, ...props }) => { 
    const buttonClass = s[color];
    return <button className={`${s.button} ${buttonClass}`}  {...props}>{children}</button>
}
import React, { ButtonHTMLAttributes } from "react"
import s from './Button.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    color: "primary" | "secondary",

}

export const Button: React.FC<ButtonProps> = ({color, disabled, children, ...props }) => { 
    const buttonClass = s[color];
    const disabledClass = disabled ? s.disabled : ''; // Додаємо клас, якщо кнопка відключена

    return <button 
    className={disabled ? disabledClass:`${s.button} ${buttonClass}`}
    disabled={disabled}
    {...props}>
        {children}
        </button>
}
import React, { ButtonHTMLAttributes } from "react";
import s from './Button.module.scss';
import { ReactComponent as AddIcon } from "assets/icons/buttonIcons/add-icon.svg";
import { ReactComponent as SelectIcon } from "assets/icons/inputIcons/select-icon.svg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: "primary" | "secondary" | "hover" | 'red';
  variant: "default" | "addLarge" | "addSmall" | "mini";
  leftElement?: boolean;
  rightElement?: boolean;
  withFull?: boolean
};

export const Button: React.FC<ButtonProps> = ({
  color,
  disabled,
  children,
  variant,
  leftElement,
  rightElement,
  withFull,
  ...props
}) => {
  const colorClass = s[color || ''];
  const disabledClass = disabled ? s.disabled : '';
  const withFullClass = withFull ? s.with_full : ''
  const colorIconClass = color === 'hover' ? s.color_icon : '';
  return (
    <button
      className={disabled ? disabledClass : `${s.button} ${s[variant]} ${colorClass} ${withFullClass} `}
      disabled={disabled}
      {...props}
    >
      {leftElement && <AddIcon className={`${s.icon_left} ${colorIconClass}`} />}
      {children}
      {rightElement && <SelectIcon className={`${s.icon_right} ${colorIconClass}`} />}
    </button>
  );
};
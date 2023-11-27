import React, { InputHTMLAttributes } from "react";
import s from "./Input.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";
import { ReactComponent as ErrorIcon } from "../../../../assets/icons/error.svg"; 
import { ReactComponent as GlobeIcon } from "../../../../assets/icons/inputIcons/globe-icon.svg"; 
import { ReactComponent as GrivnjaIcon } from "../../../../assets/icons/inputIcons/grivnya-icon.svg";
import { ReactComponent as SelectIcon } from "../../../../assets/icons/inputIcons/select-icon.svg";
import { ReactComponent as SearchIcon } from "../../../../assets/icons/inputIcons/search-icon.svg";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant: 'default'| 'select' | 'globe' | 'grivnja' | 'search';
  error?: string | null; 
  register?: UseFormRegisterReturn;
};

type IconInfo = { icon: React.ReactNode; iconClass: string } | null;


const getIconForVariant = (variant: InputProps['variant']): IconInfo => {
  switch (variant) {
    case 'select':
      return { icon: <SelectIcon />, iconClass: s.selectIcon };
    case 'globe':
      return { icon: <GlobeIcon />, iconClass: s.globeIcon };
    case 'grivnja':
      return { icon: <GrivnjaIcon />, iconClass: s.grivnjaIcon };
    case 'search': 
      return { icon: <SearchIcon />, iconClass: s.searchIcon };
    default:
      return null; 
  }
};

export const Input: React.FC<InputProps> = ({ variant, error, register, ...props }) => {
  const inputClass = s[variant];
  const hasError = Boolean(error);
  const iconInfo = getIconForVariant(variant);

  return (
    <div className={`${s.inputContainer} ${hasError ? s.error : ''}`}>
      <input className={`${s.input} ${inputClass} ${hasError ? s.errorBorder : ''}`} {...register} {...props} />
      {iconInfo && <div className={`${s.iconContainer} ${iconInfo.iconClass}`}>{iconInfo.icon}</div>}
      {error && (
        <div className={s.errorContainer}>
          <ErrorIcon className={s.errorIcon} />
          <span className={s.errorMessage}>{error}</span>
        </div>
      )}
    </div>
  );
}
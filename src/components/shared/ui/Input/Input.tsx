import React, { InputHTMLAttributes, useState } from "react";
import s from "./Input.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";
import { ReactComponent as ErrorIcon } from "../../../../assets/icons/error.svg";
import { ReactComponent as GlobeIcon } from "../../../../assets/icons/inputIcons/globe-icon.svg";
import { ReactComponent as GrivnjaIcon } from "../../../../assets/icons/inputIcons/grivnya-icon.svg";
import { ReactComponent as SelectIcon } from "../../../../assets/icons/inputIcons/select-icon.svg";
import { ReactComponent as SearchIcon } from "../../../../assets/icons/inputIcons/search-icon.svg";
import { ReactComponent as ShowPasswordIcon } from "../../../../assets/icons/inputIcons/shop-password-icon.svg";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant: "default" | "select" | "globe" | "grivnja" | "search" | "password";
  error?: string | null;
  register?: UseFormRegisterReturn;
};

type IconInfo = { icon: React.ReactNode; iconClass: string } | null;

const getIconForVariant = (variant: InputProps["variant"]): IconInfo => {
  switch (variant) {
    case "select":
      return { icon: <SelectIcon />, iconClass: s.selectIcon };
    case "globe":
      return { icon: <GlobeIcon />, iconClass: s.globeIcon };
    case "grivnja":
      return { icon: <GrivnjaIcon />, iconClass: s.grivnjaIcon };
    case "search":
      return { icon: <SearchIcon />, iconClass: s.searchIcon };
    case "password":
      return { icon: <ShowPasswordIcon />, iconClass: s.passwordIcon };
    default:
      return null;
  }
};

export const Input: React.FC<InputProps> = ({
  variant,
  error,
  register,
  disabled,
  onClick,
  readOnly,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputClass = s[variant];
  const hasError = Boolean(error);
  const iconInfo = getIconForVariant(variant);
  const disabledClass = disabled ? s.disabled : "";
  const selectReadOnlyClass =
    variant === "select" && readOnly ? s.select_read_only : "";

  return (
    <div
      className={`${s.container} ${
        hasError ? s.errorContainer : ""
      } ${selectReadOnlyClass}`}
      onClick={onClick}
    >
      <div className={ disabled ? disabledClass :`${s.inputContainer} ${hasError ? s.errorBorder : ""}`}>
        <input
          className={`${
            disabled ? disabledClass : `${s.input} ${inputClass}`
          } ${selectReadOnlyClass}`}
          type={
            variant === "password" && !showPassword
              ? "password"
              : variant === "search"
              ? "search"
              : "text"
          }
          disabled={disabled}
          {...register}
          {...props}
        />
        {iconInfo && (
          <div
            className={`${s.iconContainer} ${iconInfo.iconClass} ${
              variant === "search" ? s.searchIcon : ""
            }`}
            onClick={() =>
              variant.includes("password") && setShowPassword((prev) => !prev)
            }
          >
            {iconInfo.icon}
          </div>
        )}
      </div>
      {error && (
        <div className={s.errorContainer}>
          <ErrorIcon className={s.errorIcon} />
          <span className={s.errorMessage}>{error}</span>
        </div>
      )}
    </div>
  );
};

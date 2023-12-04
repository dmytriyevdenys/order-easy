import s from "./PaginationItem.module.scss";
import { ReactComponent as Icon } from "../../../assets/icons/inputIcons/select-icon.svg";
import { ButtonHTMLAttributes } from "react";
type ItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  pageNumber?: string | number;
  typeIcon?: "left" | "right";
  current_page?: number;
  onNextPage?: (url: string) => void;
  onPreviusPage?: (url: string) => void;
};
export const PaginationItem: React.FC<ItemProps> = ({
  pageNumber,
  current_page,
  disabled,
  typeIcon,
  onNextPage,
  onPreviusPage,
  ...props
}) => {
  const disabledClass = disabled ? s.disabled : "";
  const iconClass = typeIcon ? s[typeIcon] : "";
  if (!pageNumber)
    return (
      <button
        className={
          disabled ? `${disabledClass} ${iconClass}` : `${s.icon} ${iconClass}`
        }
        disabled={disabled}
        {...props}
      >
        <Icon />
      </button>
    );
  return (
    <div
      className={`${s.item_container} ${
        current_page === pageNumber && s.active
      }`}
    >
      <button
        className={`${s.item} ${current_page === pageNumber && s.active}`}
        {...props}
      >
        {pageNumber}
      </button>
    </div>
  );
};

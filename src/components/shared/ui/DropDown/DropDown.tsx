import React, { HTMLAttributes, ReactNode, useEffect, useState } from "react";
import s from "./DropDown.module.scss";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useOnClickOutside } from "../../../../utils/useClickOutside";
import { useElementPosition } from "../../../../utils/useElementPosition";

type DropDownProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  showElement?: "button" | "input";
  colorElement?: "primary" | "hover" | "secondary"
  readonlyInput?: boolean;
  value?: string | number;
  closeToClickElement?: boolean;
  showLeftIconButton?: boolean;
  showRightIconButton?: boolean;
  show?: boolean;
  onButtonClick?: () => void; 
  closeDropDown?: () => void;
};

export const DropDown: React.FC<DropDownProps> = ({
  children,
  showElement,
  colorElement = 'primary',
  readonlyInput,
  showLeftIconButton,
  showRightIconButton,
  value,
  placeholder,
  closeToClickElement,
  show,
  onButtonClick,
  closeDropDown,
  ...props
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const elementPosition = useElementPosition({targetRef: containerRef});
  useOnClickOutside({
    ref: containerRef,
    handler: () => {
      setShowDropDown(false);
      closeDropDown && closeDropDown();
    },
  });
  useEffect(() => {
    if (show === false ) setShowDropDown(false);
    if (show === true) setShowDropDown(true)
  },[show, setShowDropDown]);
  const listClassName = elementPosition === 'above' ? s.above : s.below ;  
  return (
    <div className={s.container} ref={containerRef} {...props}>
      <div className={s.drop_down_button}>
        {showElement === "button" && (
          <Button leftElement={showLeftIconButton} rightElement={showRightIconButton} 
            variant="addLarge"
            color={colorElement && colorElement}
            withFull
            onClick={() => {
             setShowDropDown(prev => !prev);
              onButtonClick && onButtonClick();
            }}
          >
            {value}
          </Button>
        )}
        {showElement === "input" && (
          <Input
            variant="select"
            readOnly={readonlyInput}
            onClick={() => setShowDropDown((prev) => !prev)}
            value={value}
            placeholder={placeholder}
          />
        )}
      </div>
      {showDropDown && (
        <ul
          className={`${s.list} ${listClassName}`}
          onClick={() => closeToClickElement && setShowDropDown(false)}
        >
          {children}
        </ul>
      )}
    </div>
  );
};

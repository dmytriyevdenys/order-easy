import React, { HTMLAttributes, ReactNode, useEffect, useState } from "react";
import s from "./DropDown.module.scss";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useOnClickOutside } from "../../../../utils/useClickOutside";
import { useElementPosition } from "../../../../utils/useElementPosition";
import { useKeyPress } from "utils/useKeyPress";

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
  listWidth?: string;
  below?: boolean;
  scrollHeight?: string;
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
  listWidth,
  below,
  scrollHeight,
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
  const listClassName =  elementPosition === 'above' ? s.above : s.below ;  
const scrollClassName = scrollHeight &&  s.scroll
useKeyPress('Escape', () => setShowDropDown(false)); 

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
            onClick={() => {
              setShowDropDown((prev) => !prev)
              onButtonClick && onButtonClick();

            }}
            value={value}
            placeholder={placeholder}
          />
        )}
      </div>
      {showDropDown && (
        <ul
          className={`${s.list} ${!below && listClassName} ${scrollClassName}`}
          onClick={() => closeToClickElement && setShowDropDown(false)}
          style={{width: listWidth, maxHeight: scrollHeight}}
        >
          {children}
        </ul>
      )}
    </div>    
  );
};

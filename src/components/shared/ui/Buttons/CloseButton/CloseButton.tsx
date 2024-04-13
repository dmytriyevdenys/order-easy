import { HTMLAttributes, useRef, useState } from "react";
import s from "./CloseButton.module.scss";
import { ReactComponent as CloseIcon } from "assets/icons/orderIcons/close.svg";
import {useKeyPress} from "utils/useKeyPress";
import { Button } from "../Button/Button";
import { useCalculatePosition } from "utils/useCalculatePosition";

type CloseButtonProps = HTMLAttributes<HTMLDivElement> & {
  toConfirm: () => void;
  cancel?: () => void;
};

export const CloseButton: React.FC<CloseButtonProps> = ({ toConfirm, cancel, ...props }) => {
  const [isActiveDelete, setIsActiveDelete] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  useKeyPress('Enter', toConfirm);
  useKeyPress('Escape', () => setIsActiveDelete(false));

  const {positionState, calculatePosition} = useCalculatePosition(iconRef, {top: 50, left: 110})

  const handleActiveDelete = () => {
    setIsActiveDelete(true);
    calculatePosition();
  };

  const handleToConfirm = () => {
    toConfirm();
    setIsActiveDelete(false);
  };

  const handleCancel = () => {
   cancel && cancel();
    setIsActiveDelete(false);
  }
  return (
    <div className={s.container} {...props}>
      <div className={s.icon_container} ref={iconRef}>
        <CloseIcon className={s.icon} onClick={handleActiveDelete} />
      </div>
      {isActiveDelete && (
        <div 
          className={s.confirm_delete}
          style={{ top: `${positionState.top}`, left: `${positionState.left}` }}
        >
          <p>Ви дійсно бажаєте видалити?</p>
          <div className={s.buttons_container} >
            <Button
              variant="default"
              color="secondary"
              onClick={handleCancel}
              tabIndex={1}
            >
              Скасувати
            </Button>
            <Button variant="default" color="red" onClick={handleToConfirm}tabIndex={2} >
              Видалити
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
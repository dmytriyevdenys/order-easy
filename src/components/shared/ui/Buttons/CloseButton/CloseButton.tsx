import { useRef, useState, useCallback } from "react";
import s from "./CloseButton.module.scss";
import { ReactComponent as CloseIcon } from "assets/icons/orderIcons/close.svg";
import {useKeyPress} from "utils/useKeyPress";
import { Button } from "../Button/Button";

type CloseButtonProps = {
  toConfirm: () => void;
  cancel?: () => void;
};

export const CloseButton: React.FC<CloseButtonProps> = ({ toConfirm, cancel }) => {
  const [isActiveDelete, setIsActiveDelete] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  useKeyPress('Enter', toConfirm);
  useKeyPress('Escape', () => setIsActiveDelete(false));

  const calculatePosition = useCallback(() => {
    if (iconRef.current) {
      const iconRect = iconRef.current.getBoundingClientRect();
      setPosition({
        top: iconRect.bottom + window.scrollY + 50,
        left: iconRect.left + window.scrollX - 110,
      });
    }
  }, []);

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
    <div className={s.container}>
      <div className={s.icon_container} ref={iconRef}>
        <CloseIcon className={s.icon} onClick={handleActiveDelete} />
      </div>
      {isActiveDelete && (
        <div 
          className={s.confirm_delete}
          style={{ top: `${position.top}px`, left: `${position.left}px` }}
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
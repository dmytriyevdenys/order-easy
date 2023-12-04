import { useEffect, useState } from "react";
import s from "./DropDown.module.scss"

type DropDownProps = {
    children: React.ReactNode
    active: boolean;
    onToggle: () => void;
}
export const DropDown: React.FC<DropDownProps> = ({ children, active, onToggle }) => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(active);
  
    const toggleDropDown = () => {
        setIsDropDownOpen(!isDropDownOpen);
        if (onToggle) {
          onToggle(); // викликаємо зовнішній обробник при відкритті/закритті
        }
      };
    
  
    useEffect(() => {
      document.addEventListener("click", toggleDropDown);
  
      return () => {
        document.removeEventListener("click", toggleDropDown);
      };
    }, [isDropDownOpen]); 
    return (
      <div className={s.container} >
        <ul style={{ display: isDropDownOpen ? "block" : "none" }} className={s.items}>
          {children}
        </ul>
      </div>
    );
  };
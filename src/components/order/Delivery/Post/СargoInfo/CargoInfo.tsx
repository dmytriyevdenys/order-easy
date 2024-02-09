import { PostComponentContainer } from "../PostComponentContainer/ PostComponentContainer";
import { OpenCargoInfo } from "./OpenCargoInfo/OpenCargoInfo";
import { useState } from "react";

export const CargoInfo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleSetIsOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div>
      <div onClick={handleSetIsOpen}>
        <PostComponentContainer text="Інфо" isOpen={isOpen} />
      </div>
      {isOpen && <OpenCargoInfo />}
    </div>
  );
};

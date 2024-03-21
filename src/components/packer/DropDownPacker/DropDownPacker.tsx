import { useState } from "react";
import { IPacker } from "../../../interfaces/packer.interface";
import { Button } from "../../shared/ui/Buttons/Button/Button";
import { DropDownItem } from "../../shared/ui/DropDown/DropDownItem/DropDownItem";
import s from "./DropDownPacker.module.scss";
import { PackerForm } from "../PackerForm/PackerForm";
import { DropDown } from "../../shared/ui/DropDown/DropDown";

type DropDownPackerProps = {
  setPacker: (n: IPacker) => void;
  packersData: IPacker[];
  getPacker: () => void;
  buttonValue: string
};
export const DropDownPacker: React.FC<DropDownPackerProps> = ({
  setPacker,
  getPacker,
  packersData,
  buttonValue
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showSmallForm, setShowSmallForm] = useState(false);
  const [packerId, setPackerId] = useState<number>(); 
  const [buttonClicked, setButtonClicked] = useState(false);
 
  const setPackerHandle = (packer?: IPacker) => {
    setShowForm(true);
    setShowSmallForm(true);
    setPackerId(packer?.id);
  };
  const closeForm = () => {
    setShowForm(false);
    setShowSmallForm(false);
    setPackerId(undefined);
  };
  const closeDropDown = () => {
    setButtonClicked(false);
    closeForm();
  };
  const onButtonClickHandle = () => {
    !buttonClicked && getPacker();
    setButtonClicked(prev => !prev);
    (buttonClicked && showForm) && closeForm();
  }   
  return (
    <div className={s.container}>
      <DropDown 
      closeDropDown={closeDropDown}
        onButtonClick={() => onButtonClickHandle()}
        showElement="button"
        showLeftIconButton
        showRightIconButton
        value={buttonValue || 'Обрати'}
        show={buttonClicked}
      >
        <div className={s.drop_down_packer_container}>
          {(showForm) && (
            <PackerForm
              small={showSmallForm}
              id={packerId}
              setPacker={setPacker}
              closeForm={closeForm}
              closeDropDown={closeDropDown}
            />
          )}
          {(!showForm && packersData) && (
            <div className={s.packer_list}>
              {packersData.map((packerItem) => (
                <DropDownItem
                  key={packerItem.id}
                  data={packerItem.name}
                  onClick={() => setPackerHandle(packerItem)}
                />
              ))}
              <Button
                variant="addSmall"
                color="primary"
                leftElement
                onClick={() => {
                  setShowForm(true)}}
              >
                Додати пакувальника
              </Button>
            </div>
          )}
        </div>
      </DropDown>
    </div>
  );
};

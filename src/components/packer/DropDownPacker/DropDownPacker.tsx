import { useState } from "react";
import { IPacker } from "../../../interfaces/packer.interface";
import { Button } from "../../shared/ui/Button/Button";
import { DropDown } from "../../shared/ui/DropDown/DropDown";
import { DropDownItem } from "../../shared/ui/DropDown/DropDownItem/DropDownItem";
import s from "./DropDownPacker.module.scss";
import { PackerForm } from "../PackerForm/PackerForm";

type DropDownPackerProps = {
  packersData: IPacker[];
  setPacker: (n: IPacker) => void;
};
export const DropDownPacker: React.FC<DropDownPackerProps> = ({
  packersData,
  setPacker,
}) => {
  const [showFrom, setShowForm] = useState(false);
  const [showSmallForm, setShowSmallForm] = useState(false);
  const [packerId, setPackerId] = useState<number>();
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

  return (
    <>
      <DropDown >
        {showFrom ? (
          <PackerForm
            small={showSmallForm}
            id={Number(packerId)}
            setPacker={setPacker}
            closeForm={closeForm}
          />
        ) : (
          <div>
            {packersData?.map((packer) => (
              <DropDownItem
                key={packer.id}
                data={packer.name}
                onClick={() => setPackerHandle(packer)}
              />
            ))}
            <Button
              variant="addSmall"
              color="primary"
              leftElement
              onClick={() => setShowForm(true)}
            >
              Додати пакувальника
            </Button>
          </div>
        )}
      </DropDown>
    </>
  );
};

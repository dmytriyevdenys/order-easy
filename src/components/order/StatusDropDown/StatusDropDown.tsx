import { useGetStatuses } from "hooks/Order/useGetStatus";
import s from "./StatusDropDown.module.scss";
import { DropDown } from "components/shared/ui/DropDown/DropDown";
import { useState } from "react";
import { TStatus } from "types/order/status.type";
import { StatusItem } from "./StatusItem/StatusItem";

type StatusDropDownProps = {
  currentStatus?: TStatus;
}
export const StatusDropDown: React.FC<StatusDropDownProps> = ({ currentStatus }) => {
  const { data, isSuccess } = useGetStatuses();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<TStatus | undefined>((isSuccess && data[0]) || currentStatus  );

  const handleOpenDropDown = () => {
   setIsOpen(prev => !prev)
  };  
  return (
    <div className={s.container}>
      <div onClick={handleOpenDropDown} className={s.status}>
         {status?.name}
        <div
          className={s.status_color}
          style={{ backgroundColor: status?.color || "" }}
        >
               <DropDown
        closeToClickElement
        show={isOpen}
        closeDropDown={() => setIsOpen(false)}
        listWidth="100%"
        scrollHeight="300"
      >
          {data?.map((status) => (
              <StatusItem
                key={status.id}
                name={status.name}
                color={status.color}
                onClick={() => setStatus(status)}
              />
          ))}
      </DropDown>
        </div>
      </div>

    </div>
  );
};

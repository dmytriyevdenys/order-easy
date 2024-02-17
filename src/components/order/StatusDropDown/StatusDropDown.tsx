import { useGetStatuses } from "hooks/Order/useGetStatus";
import s from "./StatusDropDown.module.scss";
import { DropDown } from "components/shared/ui/DropDown/DropDown";
import { DropDownItem } from "components/shared/ui/DropDown/DropDownItem/DropDownItem";
import { useState } from "react";
import { TStatus } from "interfaces/order/status.type";
import { StatusItem } from "./StatusItem/StatusItem";

export const StatusDropDown: React.FC = () => {
  const { data, refetch } = useGetStatuses();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<TStatus>();

  const handleOpenDropDown = () => {
    !isOpen && refetch();
    setIsOpen(true);
  };
  return (
    <div className={s.container}>
      <div onClick={handleOpenDropDown} className={s.status}>
        {status?.name || "Оберіть статус"}
        <div
          className={s.status_color}
          style={{ backgroundColor: status?.color || "" }}
        ></div>
      </div>
      <DropDown
        closeToClickElement
        show={isOpen}
        closeDropDown={() => setIsOpen(false)}
        listWidth="100%"
        scrollHeight="300"
      >
        <div className={s.status_list}>
          {data?.map((status) => (
            <div key={status.id} onClick={() => setStatus(status)}>
              <StatusItem
                key={status.id}
                name={status.name}
                color={status.color}
              />
            </div>
          ))}
        </div>
      </DropDown>
    </div>
  );
};

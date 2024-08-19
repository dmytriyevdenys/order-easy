import s from "./StatusDropDown.module.scss";
import { DropDown } from "components/shared/ui/DropDown/DropDown";
import { TStatus } from "types/order/status.type";
import { StatusItem } from "./StatusItem/StatusItem";
import { useStatusDropDown } from "hooks/Order/feature/useStatusDropDown";

type StatusDropDownProps = {
  currentStatus?: TStatus;
};
export const StatusDropDown: React.FC<StatusDropDownProps> = ({
  currentStatus,
}) => {
  const { handleOpenDropDown, closeDropDown, setStatus, status, isOpen, data } =
    useStatusDropDown(currentStatus);    
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
            closeDropDown={closeDropDown}
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

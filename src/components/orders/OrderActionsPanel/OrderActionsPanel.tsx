import { useNavigate } from "react-router-dom";
import s from "./OrderActionsPanel.module.scss";
import { ORDER_ROUTE } from "constans/routes";
import { Button } from "components/shared/ui/Button/Button";
import { Input } from "components/shared/ui/Input/Input";
import { useKeyPress } from "utils/useKeyPress";

export const OrderActionsPanel: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (orderId?: string) => {
    const route = orderId ? `${ORDER_ROUTE}/${orderId}` : `${ORDER_ROUTE}/new`;
    navigate(route);
  };
  useKeyPress('Space', () => handleNavigate())
  return (
    <div className={s.container}>
        <div className={s.filters_container}>
            <div className={s.input_container}><Input variant='search' placeholder="Пошук"/></div>
            <Input variant='select' value='Фільтри' readOnly/>
        </div>
      <div>
        </div><Button
        variant="default"
        leftElement
        color="primary"
        onClick={() => handleNavigate()}
      >
        Створити замовлення
      </Button>
    </div>
  );
};

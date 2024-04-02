import { Button } from "components/shared/ui/Buttons/Button/Button";
import s from "./EditElementBlockLabel.module.scss";

type EditElementBlockLabelProps = {
    children: React.ReactNode;
    toConfirm: () => void;
    cancel?: () => void;
}
export const EditElementBlockLabel: React.FC<EditElementBlockLabelProps> = ({
  children,
  toConfirm,
  cancel
}) => {
  return (
    <div className={s.container}>
      {children}
      <div className={s.buttons}>
        <Button variant="default" color="secondary" onClick={cancel}>
          Скасувати
        </Button>
        <Button variant="default" color="primary" onClick={toConfirm}>
          Підтвердити
        </Button>
      </div>
    </div>
  );
};
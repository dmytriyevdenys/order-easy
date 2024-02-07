import { SwitchInfoButton } from "components/order/OrderInfo/SwitchInfoButton/SwitchInfoButton.";
import s from "./OpenCargoInfo.module.scss";
import { Input } from "components/shared/ui/Input/Input";

export const OpenCargoInfo: React.FC = () => {
  return (
    <div className={s.container}>
      <div className={s.buttons_container}>
        <SwitchInfoButton text="Відділення" selected OnClick={() => {}} />
        <SwitchInfoButton text="Поштомат" selected={false} OnClick={() => {}} />
      </div>
      <form className={s.form}>
        <div className={s.general_parameters}>
            <Input variant="default" placeholder="Вага" style={{background: 'none'}}/>
            <Input variant="default" placeholder="К-сть міць"style={{background: 'none'}}/>
        </div>
        <div className={s.cost}>
            <Input variant='grivnja'placeholder="Оголош. в-сть" style={{background: 'none'}}/>
            <Input variant='grivnja' placeholder="Сума наложки" style={{background: 'none'}}/>
        </div>
        <Input variant="default" placeholder="Опис" style={{background: 'none'}}/>
        <Input variant="default" placeholder="Додаткова Інф" style={{background: 'none'}}/>
      </form>
    </div>
  );
};

import { SwitchInfoButton } from "components/order/OrderInfo/SwitchInfoButton/SwitchInfoButton.";
import s from "./OpenCargoInfo.module.scss";
import { Input } from "components/shared/ui/Input/Input";
import { PaymentBlock } from "./PaymentBlock/PaymentBlock";
import { AdditionalInformation } from "components/order/Additionalnformation/Additionalnformation";
import { useState } from "react";
import { PostField } from "../../PostField/PostField";


export const OpenCargoInfo: React.FC = () => {
  const buttons = [
    {id: 'post', text: 'Відділення'},
    {id: 'postomat', text: 'Поштомат'}
  ]
const [selectedButton, setSelectedButton] = useState<string>('post')
  return (
    <div className={s.container}>
      <div className={s.buttons_container}>
      {buttons.map(button =>  (
        <SwitchInfoButton text={button.text} selected={button.id === selectedButton} OnClick={() => setSelectedButton(button.id)}/>
      ))}
      </div>
      <form className={s.form}>
        {selectedButton === 'post' && <div className={s.general_parameters}>
          <div className={s.post_field}><PostField label="Вага" Component={ <Input variant="default" backgroundNone/>}/> </div>
          <div className={s.post_field}><PostField label="К-сть місць" Component={ <Input variant="default"backgroundNone/>}/> </div>
        </div>}
        {selectedButton === 'postomat' && <div className={s.optional_parameters}>
            <div className={s.post_field}><PostField label="Довжина" Component={<Input variant="default"backgroundNone/>}/></div>
            <div className={s.post_field}><PostField label="Ширина" Component={<Input variant="default"backgroundNone/>}/></div>
            <div className={s.post_field}><PostField label="Висота" Component={<Input variant="default"backgroundNone/>}/></div>
            <div className={s.post_field}><PostField label="Вага" Component={<Input variant="default"backgroundNone />}/></div>
          </div>}
        <div className={s.cost}>
          <div className={s.post_field}><PostField label="Оголош. в-сть" Component={<Input variant='grivnja'backgroundNone/>}/></div> 
          <div className={s.post_field}><PostField label="Наложка" Component={<Input variant='grivnja'backgroundNone/>}/></div> 
        </div>
        <PostField label="Опис" Component={<AdditionalInformation/>}/>
        <PostField label="Додаткова інформація" Component={<AdditionalInformation/>}/>
        <PaymentBlock textBlock="Платник доставки"/>
        <PaymentBlock textBlock="Платник післяоплати"/>
        <PaymentBlock textBlock="Форма оплати"/>
      </form>
    </div>
  );
};

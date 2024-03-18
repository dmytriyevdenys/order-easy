import { TCustomer } from "interfaces/buyer/buyer.type";
import s from "./CustomerForm.module.scss";
import { AbstractFormComponent } from "components/order/AbstractFormComponent/AbstractFormComponent";
import { Input } from "components/shared/ui/Input/Input";


export const CustomerForm: React.FC<Partial<TCustomer>> = ({ full_name, phones, email}) => {    
    return (
        <div className={s.container}>
            <AbstractFormComponent
        label="ПІБ"
        Component={<Input variant="default" value={full_name || ""} autoFocus={true}/>}
      />
      {phones?.length &&  phones?.map((phone, index) => (
        <AbstractFormComponent
            key={index}
            label="Телефон"
            Component={<Input variant="default" value={phone || ""} />}
        />
      ))}
      {!phones?.length && <AbstractFormComponent
            label="Телефон"
            Component={<Input variant="default" />}
        /> }
        </div>
    )
}
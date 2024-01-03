import { SubmitHandler, useForm } from "react-hook-form";
import s from "./CreateOreder.module.scss";
import { AddProductsDropDown } from "../../product/addProductDropDown/AddProductsDropDown";

type FormProps  = {
    id?: number; 
    status_id: number;
    orderCrm_id: string;
    order_id?:string;
    source_id: number;
    manager_id: number;
    products: [];
    totalPrice: number;
    additionalnformation: string;
    payments: string;
    buyer: string;
    notes:string[];

}
type CreateOrderFormProps = {};
export const CreateOrderForm:React.FC = () => {
const {register, handleSubmit, reset, formState: { errors } } = useForm();

const onSubmit: SubmitHandler<FormProps> = (data) => data;
    return (
        <div className={s.container}>
            <form onSubmit={(e) => e.preventDefault()} >
                <div className={s.add_products_container}>
                <AddProductsDropDown/>
                </div>
            </form>
        </div>
    )
}
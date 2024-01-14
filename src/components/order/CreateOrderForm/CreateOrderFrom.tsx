import { SubmitHandler, useForm } from "react-hook-form";
import s from "./CreateOrder.module.scss";
import { AddProductsDropDown } from "../../product/addProductDropDown/AddProductsDropDown";
import { useProductManagment } from "../../../hooks/Product/feature/useProductManagment";
import { TProduct } from "../../../interfaces/products/products.type";
import { SourceDropDown } from "../SourceDropDown/SourceDropDown";
import { useSourceDropDown } from "../../../hooks/Order/feature/useSourceDropDown";
import { ManagerDropDown } from "../ManagerDropDown/ManagerDropDown";
import { StatusDropDown } from "../StatusDropDown/StatusDropDown";
import { AbstractFormComponent } from "../AbstractFormComponent/AbstractFormComponent";
import { Input } from "components/shared/ui/Input/Input";
import { SearchSettlements } from "../SearchSettlements/SearchSettlements";

type FormProps = {
  id?: number;
  status_id?: number;
  orderCrm_id?: string;
  order_id?: string;
  source_id?: number;
  manager_id?: number;
  products?: TProduct[];
  totalPrice?: number;
  additionalnformation?: string;
  payments?: string;
  buyer?: string;
  notes?: string[];
};
type CreateOrderFormProps = {};
export const CreateOrderForm: React.FC = () => {
  const addProductsDropDownProps = useProductManagment();
  const sourceDropDownProps = useSourceDropDown()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FormProps> = (data) => {
    const {products} = addProductsDropDownProps
    const newData = { ...data, products };
  };
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.add_products_container}>
          <AddProductsDropDown {...addProductsDropDownProps}/>
        </div>
        <div className={s.source_tag_container}>
          <SourceDropDown {...sourceDropDownProps}/>
          <div>
            Тег
          </div>
          </div>
          <StatusDropDown/>
          <AbstractFormComponent label='Менеджер' Component={ManagerDropDown} />
          <AbstractFormComponent label="ТТН" Component={Input} componentProps={{variant: 'default'}} />
          <AbstractFormComponent label="Сума" Component={Input} componentProps={{variant: 'grivnja'}}/>
          <AbstractFormComponent label="Місто" Component={SearchSettlements}/>
      </form>
      </div>
    </div>
  );
};

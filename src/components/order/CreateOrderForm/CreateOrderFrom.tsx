import { SubmitHandler, useForm } from "react-hook-form";
import s from "./CreateOrder.module.scss";
import { AddProductsDropDown } from "../../product/addProductDropDown/AddProductsDropDown";
import { useProductManagment } from "../../../hooks/Product/feature/useProductManagment";
import { TProduct } from "../../../interfaces/products/products.type";
import { SourceDropDown } from "../SourceDropDown/SourceDropDown";
import { useSourceDropDown } from "../../../hooks/Order/feature/useSourceDropDown";

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.add_products_container}>
          <AddProductsDropDown {...addProductsDropDownProps}/>
        </div>
        <div className={s.source_tag_container}>
          <SourceDropDown {...sourceDropDownProps}/>
          <div>
            Тег
          </div>
          </div>
        
      </form>
    </div>
  );
};

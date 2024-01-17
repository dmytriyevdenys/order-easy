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
import { useSearchSettlements } from "hooks/Order/feature/useSearchSettlements";
import { useSearchWarehouse } from "hooks/Order/feature/useSearchWarehouse";
import { SearchWarehouse } from "../SearchWarehouse/SearchWarehouse";

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
  const sourceDropDownProps = useSourceDropDown();
  const searchSettlementsProps = useSearchSettlements();
  const { settlement } = searchSettlementsProps;
  const searchWarehouseProps = useSearchWarehouse(
    settlement ? settlement.Ref : ""
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FormProps> = (data) => {
    const { products } = addProductsDropDownProps;
    const newData = { ...data, products };
  };
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={s.add_products_container}>
            <AddProductsDropDown {...addProductsDropDownProps} />
          </div>
          <div className={s.source_tag_container}>
            <SourceDropDown {...sourceDropDownProps} />
            <div>Тег</div>
          </div>
          <StatusDropDown />
          <AbstractFormComponent
            label="Менеджер"
            Component={<ManagerDropDown />}
          />
          <AbstractFormComponent
            label="ТТН"
            Component={<Input variant="default" disabled={true} />}
          />
          <AbstractFormComponent
            label="Сума"
            Component={
              <Input
                variant="grivnja"
                type="number"
                value={addProductsDropDownProps.totalPrice}
                onChange={(e) => e.target.value}
              />
            }
          />
          <AbstractFormComponent
            label="Місто"
            Component={<SearchSettlements {...searchSettlementsProps} />}
          />
          <AbstractFormComponent
            label="№ відділення"
            Component={<SearchWarehouse {...searchWarehouseProps} />}
          />
        </form>
      </div>
    </div>
  );
};

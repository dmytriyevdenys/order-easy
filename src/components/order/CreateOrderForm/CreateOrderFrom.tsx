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
import { PaymentMethodDropDown } from "../PaymentMethodDropDown/PaymentMethodDropDown";
import { usePaymentMethod } from "hooks/Order/feature/usePaymentMethod";
import { AdditionalInformation } from "../Additionalnformation/Additionalnformation";
import { Button } from "components/shared/ui/Button/Button";
import { ResizeContainer } from "components/shared/Resize";

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
  const paymentMethodDropDownProps = usePaymentMethod(
    addProductsDropDownProps.totalPrice
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FormProps> = (data) => {
    const { products, totalPrice } = addProductsDropDownProps;
    const { source_id } = sourceDropDownProps;
    const newData = { ...data, products, totalPrice, source_id };
  };
  const containerClass = addProductsDropDownProps.buttonClicked
    ? s.active_add_product
    : "";
  return (
    <div className={`${s.container} ${containerClass}`}>
      <ResizeContainer minWidth={300} maxWidth={500} width="390" side="right">
        <div className={s.overlay}></div>
        <div className={s.wrapper}>
          <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            <AddProductsDropDown {...addProductsDropDownProps} />
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
              Component={<Input variant="default" disabled />}
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
            <AbstractFormComponent
              label="Спосіб оплати"
              Component={
                <PaymentMethodDropDown {...paymentMethodDropDownProps} />
              }
            />
            {paymentMethodDropDownProps.paymentMethod.label === "Аванс" && (
              <AbstractFormComponent
                label="Сума авансу"
                Component={<Input variant="grivnja" autoFocus />}
              />
            )}
            <AbstractFormComponent
              label="Додат.інформ"
              Component={
                <AdditionalInformation
                  products={addProductsDropDownProps.products}
                />
              }
            />
            <AbstractFormComponent
              label="ПІБ"
              Component={
                <Input variant="default" {...register("buyer_name")} />
              }
            />
            <AbstractFormComponent
              label="Телефон"
              Component={<Input variant="default" type="number" />}
              {...register("buyer_phone")}
            />
            <div className={s.buttons_container}>
              <Button
                variant="default"
                color="secondary"
                disabled={addProductsDropDownProps.buttonClicked}
              >
                Відміна
              </Button>
              <Button
                variant="default"
                color="primary"
                disabled={addProductsDropDownProps.buttonClicked}
              >
                Зберегти
              </Button>
            </div>
          </form>
        </div>
      </ResizeContainer>
    </div>
  );
};

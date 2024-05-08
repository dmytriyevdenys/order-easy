import { AbstractFormComponent } from "components/order/AbstractFormComponent/AbstractFormComponent";
import s from "./AddSingleProductForm.module.scss";
import { Input } from "components/shared/ui/Input/Input";
import { Button } from "components/shared/ui/Buttons/Button/Button";
import { TProduct } from "interfaces/products/products.type";
import { SubmitHandler, useForm } from "react-hook-form";

type AddSingleProductFormProps = {
    addProduct: (product: TProduct) => void;
    closeForm: () => void;
}

export const AddSingleProductForm: React.FC<AddSingleProductFormProps> = ({ addProduct, closeForm }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<Partial<TProduct>> = (data) =>  {
        addProduct(data as TProduct);
        reset()
        closeForm();
      }

      const handleCreateButtonClick = () => {
        handleSubmit(onSubmit)();
      };

    return (
        <section className={s.container}>
            <h2>Стоврення разового товару</h2>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}> 
                <AbstractFormComponent label="Артикул " Component={<Input variant='default' {...register('sku')}/>}/>
                <AbstractFormComponent label="Назва " Component={<Input variant='default' autoFocus {...register('name')}/>}/>
                <AbstractFormComponent label="Ціна " Component={<Input variant='grivnja' {...register('price')}/>}/>
                <AbstractFormComponent label="Кількість " Component={<Input variant='default' value={1}{...register('quantity')}/>}/>
                <AbstractFormComponent label="Вага " Component={<Input variant='default' {...register('weight')}/>}/>
                <div className={s.buttons}>
                    <Button type="button" variant='default' color='secondary' onClick={closeForm}>Скасувати</Button> 
                    <Button type="button" variant='default' color='primary' onClick={handleCreateButtonClick}>Створити</Button> 
                </div>
            </form>
        </section>
    )
}

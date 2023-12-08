import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "../../shared/ui/Input/Input"
import s from "./SearchPackerForm.module.scss"

type SearchPackerFormProps = {
    filter: 'IntDocNumber' | 'order_id',
    search: 'string'
}
export const SearchPackerForm: React.FC = () => {
    const {register, handleSubmit} = useForm();

    const onSubmit: SubmitHandler<SearchPackerFormProps> = (data) => data
    return (
        <form className={s.form}>
           <Input variant="search"  placeholder="Пошук" {...register('search')} />
            <Input variant="select" placeholder="№ замовлення" type="text" {...register('filter')} value='№ замовлення'/>
        </form>
    )
}
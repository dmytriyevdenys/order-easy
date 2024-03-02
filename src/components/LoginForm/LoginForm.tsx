import { SubmitHandler, useForm } from "react-hook-form";
import s from "./LoginForm.module.scss";
import { Input } from "components/shared/ui/Input/Input";
import { Button } from "components/shared/ui/Button/Button";
import { useLogin } from "hooks/Auth/useLogin";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ORDERS_ROUTE } from "constans/routes";
type InputProps = {
  email: string;
  password: string;
};
export const LoginForm: React.FC = () => {
  const client = useQueryClient();
  const auth = client.getQueryData<{isAuth: boolean}>(['auth']);
 const isAuth = auth?.isAuth ;
 const navigate = useNavigate();
  const { register, handleSubmit } = useForm<InputProps>();
  const [dataForm, setDataForm] = useState<InputProps>({email: '', password: ''});
  const {mutate, error, isSuccess} = useLogin(dataForm);

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    setDataForm({...data});
    mutate();
  };
  useEffect (() => {
    if (isSuccess && isAuth) {
      navigate(ORDERS_ROUTE);
    } 
  }, [isAuth, isSuccess, navigate])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.container}>
        <div className={s.paragraph}>Увійдіть щоб продовжити</div>
      <Input
        variant="default"
        id="email"
        placeholder="Ваша електронна адреса"
    {...register('email')}
      />
      <Input
      variant="password"
      placeholder="Введіть пороль"
     {...register('password')}
     error={error?.response?.data.message || ''}
      />
      <Button variant="default" color='primary' withFull>Увійти</Button>
    </form>
  );
};

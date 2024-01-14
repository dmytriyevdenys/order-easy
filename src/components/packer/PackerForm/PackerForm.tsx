import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../shared/ui/Button/Button";
import { Input } from "../../shared/ui/Input/Input";
import s from "./PackerFrom.module.scss";
import { useCheckPacker } from "../../../hooks/Packer/useCheсkPacker";
import { useState } from "react";
import { IPacker } from "../../../interfaces/packer.interface";
import { useAddPacker } from "../../../hooks/Packer/useAddPacker";

type InputProps = {
  name: string;
  password: string;
};
type PackerFormProps = {
  small: boolean;
  id?: number;
  setPacker: (p: IPacker) => void;
  closeForm: () => void;
  closeDropDown: () => void;
};
export const PackerForm: React.FC<PackerFormProps> = ({
  small,
  id,
  setPacker,
  closeForm,
  closeDropDown,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputProps>();
  const [dataForm, setDataForm] = useState<{ name?: string; password: string }>(
    {
      password: "",
    }
  );
  const {
    data: dataPacker,
    isSuccess: isSuccessCheckPacker,
    mutate,
    error,
  } = useCheckPacker(Number(id), {
    password: dataForm?.password,
  });

  const { mutate: addPacker, isSuccess: isSuccessAddPacker } = useAddPacker({
    name: dataForm.name || "",
    password: dataForm.password,
  });

  const onSumbit: SubmitHandler<InputProps> = async (data) => {
    setDataForm(data);
    !data?.name && mutate();
    !id && addPacker();
    reset();
  };
  if (isSuccessCheckPacker) {
    setPacker(dataPacker);
    closeForm();
    closeDropDown();
  }
  isSuccessAddPacker && closeForm();

  const errorMessage = errors.password
    ? errors.password.type === "required"
      ? "Поле 'Пароль' є обов'язковим"
      : errors.password.type === "minLength"
      ? "Пароль повинен містити принаймні 6 символів"
      : "Невідома помилка"
    : error?.response?.data?.message || "";

  return (
    <div className={s.form_container}>
      <form className={s.form} onSubmit={handleSubmit(onSumbit)}>
        {!small && (
          <Input
            variant="default"
            placeholder="ім'я"
            { ...register("name") }
            autoFocus
          />
        )}
        <Input
          variant="password"
          placeholder="Пароль"
          {...register("password", { required: true, minLength: 6 })}
          autoFocus={small}
          error={errorMessage}
        />
        <Button variant="default" color="secondary" withFull>
          {small ? "Увійти" : "Додати"}
        </Button>
      </form>
    </div>
  );
};

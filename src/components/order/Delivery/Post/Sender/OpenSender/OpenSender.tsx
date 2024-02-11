import { DropDown } from "components/shared/ui/DropDown/DropDown";
import { PostField } from "../../PostField/PostField";
import s from "./OpenSender.module.scss";
import { Input } from "components/shared/ui/Input/Input";

export const OpenSender: React.FC = () => {
  return (
    <div className={s.container}>
      <PostField
        label="Місто"
        Component={<Input variant="default" backgroundNone />}
      />
      <PostField
        label="Відділення"
        Component={<Input variant="default" backgroundNone />}
      />
      <PostField
        label="Контрагент"
        Component={<DropDown showElement='input' value='Приватна особа' readonlyInput> </DropDown>}
      />
      <PostField
        label="Контактна Особа"
        Component={<Input variant="default" backgroundNone />}
      />
      <PostField
        label="Мобільний"
        Component={<Input variant="default" backgroundNone />}
      />
    </div>
  );
};

import { Input } from "components/shared/ui/Input/Input"
import { PostField } from "../../PostField/PostField"
import s from "./OpenRecipient.module.scss"

export const OpenRecipient: React.FC = () => {
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
        label="Контактна Особа"
        Component={<Input variant="default" backgroundNone />}
      />
      <PostField
        label="Мобільний"
        Component={<Input variant="default" backgroundNone />}
      />
        </div>
    )
}
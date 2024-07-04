import { LoginForm } from "components/LoginForm/LoginForm";
import s from "./LoginPage.module.scss";
import { useAuth } from "hooks/Auth/useAuth";

export const LoginPage: React.FC = () => {
  const { isLoading, isSuccess } = useAuth();

  return (
    <div className={s.container}>
      {(isLoading && !isSuccess) ? (
        <div>Loading</div>
      ) : (
        <main className={s.wrapper}>
          <div>
            <h1>EASY-ORDER CRM</h1>
          </div>
          <LoginForm />
        </main>
      )}
    </div>
  );
};

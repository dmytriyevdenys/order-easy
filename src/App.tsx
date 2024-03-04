import { Outlet, useNavigate } from "react-router-dom";
import s from "./App.module.scss";
import { SideBar } from "./components/Sidebar/Sidebar";
import { QueriesOptions, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "hooks/Auth/useAuth";
import { LoginPage } from "pages/LoginPage/LoginPage";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { LOGIN_ROUTE } from "constans/routes";
import { LocalStorageManager } from "local-storage";
import { useRefreshToken } from "hooks/Auth/useRefreshToken";
import { QueryErrorResetBoundaryValue } from "@tanstack/react-query/build/lib/QueryErrorResetBoundary";

export const App: React.FC = () => {
  const localStorage = new LocalStorageManager<string>('token');
  const token = localStorage.getData();
 useRefreshToken(token && token[0])
  
  const client = useQueryClient();
  const { isSuccess, refetch } = useAuth();
  const auth = client.getQueryData<{ isAuth: boolean }>(['auth']);
  const isAuth = auth?.isAuth;
  const navigate = useNavigate();

  useEffect(() => {
    !isAuth && isSuccess && navigate('/login');
  }, [isAuth, isSuccess, navigate]);

  client.setDefaultOptions({
    queries: {
      onError: (error) => {
        if (error instanceof AxiosError && error.response && error.response.status === 401) {
          navigate(LOGIN_ROUTE);
        }
      },
      retry: 2
    }
  });

  return (
    <div className={s.container}>
      {isAuth && (
        <>
          <SideBar />
          <div className={s.content_container}>
            <Outlet />
          </div>
        </>
      )}
      {!isAuth && <LoginPage />}
    </div>
  );
};
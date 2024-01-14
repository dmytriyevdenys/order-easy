import { Outlet, useNavigate } from "react-router-dom";
import s from "./App.module.scss";
import { SideBar } from "./components/Sidebar/Sidebar";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "hooks/Auth/useAuth";
import { setupAxios } from "services/api/axiosConfig";
import { LoginPage } from "pages/LoginPage/LoginPage";
import { useEffect } from "react";

export const App: React.FC = () => {
  const client = useQueryClient();
const { isSuccess } = useAuth();  
 const auth = client.getQueryData<{isAuth: boolean}>(['auth']);
const isAuth = auth?.isAuth ;
  const navigate = useNavigate();
  setupAxios(navigate);

  useEffect (() => {
    !isAuth && isSuccess && navigate('/login')
  },[isAuth, isSuccess, navigate])


  return (
    <div className={s.container}>
         {isAuth && (
        <>
          <SideBar />
          <div className={s.content_container}>
            <Outlet />
          </div>
        </>
      ) }
      {!isAuth && <LoginPage/>}
    </div>
  );
};

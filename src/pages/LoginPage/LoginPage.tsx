import { LoginForm } from "components/LoginForm/LoginForm"
import s from "./LoginPage.module.scss"

export const LoginPage: React.FC = () => {
    return (
    <div className={s.container}>
        <main className={s.wrapper}>
       <div> <h1>EASY-ORDER CRM</h1></div>
        <LoginForm/>    
        </main>
   
    </div>
    )
}
import s from "./OrderPage.module.scss"
import { OrderInfo } from "components/order/OrderInfo/OrderInfo"
import { CreateOrderForm } from "../../components/order/CreateOrderForm/CreateOrderFrom"
import { Post } from "components/order/Delivery/Post/Post"

export const OrderPage:React.FC = () => {
    
    return (
        <div className={s.container}>
            <div><CreateOrderForm/></div> 
            <div className={s.order_info}><OrderInfo/></div>
            <div><Post/></div>
        </div>
       
    )
}
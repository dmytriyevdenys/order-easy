import s from "./OrderPage.module.scss"
import { OrderInfo } from "components/order/OrderInfo/OrderInfo"
import { CreateOrderForm } from "../../components/order/CreateOrderForm/CreateOrderFrom"
import { Post } from "components/order/Delivery/Post/Post"
import { useLocation, useParams } from "react-router-dom"
import { useGetOrder } from "hooks/Order/useGetOrder"
    
export const OrderPage:React.FC = () => {
    const { orderId } = useParams();
    const location = useLocation();
const isNewOrder = location.pathname.includes('new')
const {data: order, isSuccess} = useGetOrder(Number(orderId) || null)   
    return (
        <div className={s.container}>
            {(isSuccess  || isNewOrder) && <div className={s.create_order_form} ><CreateOrderForm order={order}/></div> }
            <div className={s.order_info} ><OrderInfo/></div>
            <div className={s.post}><Post/></div>
        </div>
    )
}
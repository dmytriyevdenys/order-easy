import { App } from "App";
import { LOGIN_ROUTE, ORDERS_ROUTE, ORDER_ROUTE, PACKER_ROUTE } from "constans/routes";
import { LoginPage } from "pages/LoginPage/LoginPage";
import { OrderPage } from "pages/OrderPage/OrderPage";
import { OrdersPage } from "pages/OrdersPage/OrdersPage";
import { PackerPage } from "pages/PackerPage/PackerPage";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
    { 
        path: '/',
        Component: App, 
        children: [
            {
                path: PACKER_ROUTE,
                Component: PackerPage
            },
            {
                path: ORDERS_ROUTE,
                Component: OrdersPage
            },
            {
                path: `${ORDER_ROUTE}/:orderId` || `${ORDER_ROUTE}/new`,
                Component: OrderPage
            }
           
        ]
    },
    {
        path: LOGIN_ROUTE,
        Component: LoginPage
    }
    
])
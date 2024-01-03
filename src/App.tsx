import { Route, Routes } from "react-router-dom";
import s from "./App.module.scss"
import { SideBar } from "./components/Sidebar/Sidebar";
import { PackerPage } from "./pages/PackerPage/PackerPage";
import { OrderPage } from "./pages/OrderPage/OrderPage";

export const App: React.FC = () => {  
  return (
   
    <div className={s.container}> 
      <SideBar/>
      <div className={s.content_container}>
        <Routes>
          <Route path="/" element={<div>ХЗ що тут має бути</div>}/>
        <Route path="packer" element={<PackerPage/>}/>
        <Route path="order" element={<OrderPage/>}/>
        </Routes>
      </div>
    </div>    
  );
};
import s from "./App.module.scss"
import { SideBar } from "./components/Sidebar/Sidebar";
import { PackerPage } from "./pages/PackerPage/PackerPage";

export const App: React.FC = () => {  
  return (
    <div className={s.container}>
      <SideBar/>
      <div className={s.content_container}>
      <PackerPage/>
      </div>
        
    </div>
  );
};
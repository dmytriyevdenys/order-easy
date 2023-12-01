import s from "./App.module.scss"
import { PackerPage } from "./pages/PackerPage/PackerPage";

export const App: React.FC = () => {  
  return (
    <div className={s.container}>
    
      <PackerPage/>
        
    </div>
  );
};
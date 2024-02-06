import s from "./Post.module.scss";
import {ReactComponent as NovaPostIcon} from "assets/icons/orderIcons/Nova_Poshta.svg";
import { ResizeContainer } from "components/shared/Resize";

export const Post: React.FC = () => {
    return (
      
        <div className={s.container}>
            <ResizeContainer minWidth={200} maxWidth={400} width="250" side='left'>
        <div className={s.buttons_container}>
          <div className={s.post}>
            <NovaPostIcon />
          </div>
        </div>
        </ResizeContainer>
        </div>
        
     
    );
  };
  

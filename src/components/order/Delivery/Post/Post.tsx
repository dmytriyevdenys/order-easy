import s from "./Post.module.scss";
import {ReactComponent as NovaPostIcon} from "assets/icons/orderIcons/Nova_Poshta.svg";
import { ResizeContainer } from "components/shared/Resize";
import { PostOptions } from "./PostOptions/PostOptions";
import { Sender } from "./Sender/Sender";
import { Recipient } from "./Recipient/Recipient";
import {CargoInfo} from "./СargoInfo/CargoInfo"

export const Post: React.FC = () => {
    return (
      
        <div className={s.container}>
            <ResizeContainer minWidth={230} maxWidth={400} width="270" side='left'>
        <div className={s.buttons_container}>
          <div className={s.post}>
            <NovaPostIcon />
          </div>
        </div>
        <PostOptions/>
        <Sender/>
        <Recipient/>
        <CargoInfo/>
        </ResizeContainer>
        </div>  
    );
  };
  

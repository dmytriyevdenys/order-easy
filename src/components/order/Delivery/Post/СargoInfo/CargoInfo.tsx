import { PostComponentContainer } from "../PostComponentContainer/ PostComponentContainer";
import { OpenCargoInfo } from "./OpenCargoInfo/OpenCargoInfo";

export const CargoInfo: React.FC = () => {

  return (
      <div >
        <PostComponentContainer text="Інфо" open ><OpenCargoInfo /></PostComponentContainer>
      </div>
  );
};

import { PostComponentContainer } from "../PostComponentContainer/ PostComponentContainer";
import { ReactComponent as ArrovIcon } from "assets/icons/orderIcons/arrow.svg";

export const Sender: React.FC = () => {
  return (
    <div>
      <PostComponentContainer>
        <span>Відправник</span>
        <div>
          <ArrovIcon />
        </div>
      </PostComponentContainer>
    </div>
  );
};

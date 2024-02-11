import { PostComponentContainer } from "../PostComponentContainer/ PostComponentContainer";
import { OpenSender } from "./OpenSender/OpenSender";

export const Sender: React.FC = () => {
  return (
    <div>
      <PostComponentContainer text="Відправник">
        <OpenSender />
      </PostComponentContainer>
    </div>
  );
};

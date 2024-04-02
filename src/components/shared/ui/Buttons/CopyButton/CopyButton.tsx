import s from "./CopyButton.module.scss";
import {ReactComponent as CopyIcon} from "assets/icons/copy_icon.svg";

type CopyButtonProps = {
    copyValue: string;
    className?: string
}
export const CopyButton: React.FC<CopyButtonProps> = ({copyValue, className}) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(copyValue)
          .catch(err => {
            console.error('Помилка копіювання:', err);
          });
      };
    return (
        <div className={s.container}>
            <CopyIcon onClick={copyToClipboard} className={className}/>
        </div>
    )
}
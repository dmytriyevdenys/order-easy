import s from './StatusCell.module.scss';

type СellProp = {
    status: string
}
export const StatusSell: React.FC<СellProp> = ({ status }) => {
    let colorClass;
  
    switch (status) {
      case 'changed':
        colorClass = s.changed;
        break;
      case 'not changed':
        colorClass = s.notChanged;
        break;
      case 'double':
        colorClass = s.double;
        break;
      case 'offline':
        colorClass = s.offline;
        break;
      default:
        colorClass = '';
    }
  
    return   <div className={`${s.default} ${colorClass}`}  >
    {status}
  </div>
  };
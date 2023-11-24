import s from './StatusCell.module.scss';

type SellProp = {
    status: string
}
export const StatusSell: React.FC<SellProp> = ({ status }) => {
    let colorClass;
  
    switch (status.toLowerCase()) {
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
  
    return   <div className={`${s.badge} ${colorClass}`} style={{ width: '100px', height: '20px', borderRadius: '5px' }}>
    {status}
  </div>
  };
import s from "./networkStatus.module.scss"

export const NetworkStatus: React.FC<{isOnline: boolean}> = ({isOnline}) => { 
    const classesName = isOnline ? s.online : s.offline
    return (
        <div
          className={`${s.container} `}
        >
          <p className={`${s.status} ${classesName}`}>
            {isOnline
              ? "Мережа доступна"
              : "Мережі немає. Виконується локальна обробка"}
          </p>
        </div>
    )
}
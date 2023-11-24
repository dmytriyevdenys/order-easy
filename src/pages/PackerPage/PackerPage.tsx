import { useEffect, useState } from "react";
import s from './PackerPage.module.scss'
import useOnlineStatus from "../../hooks/Packer/useOnlineStatus";
import { usePackers } from "../../hooks/Packer/useAllPackers";
import { usePacker } from "../../hooks/Packer/usePacker";
import { useAddIntDoc } from "../../hooks/Packer/useAddIntDoc";
import { useOfflineAddIntDoc } from "../../hooks/Packer/useOfflineAddIntDoc";
import { useSyncWithServer } from "../../hooks/Packer/useSyncWithServer";
import { IPacker } from "../../interfaces/packer.interface";
import { Button } from "../../components/shared/ui/Button/Button";
import ErrorToast from "../../components/shared/ErrorToast";
import { PackerTable } from "../../components/packer/PackerTable/PackerTable";


export const PackerPage: React.FC = () => {
    const isOnline = useOnlineStatus();

    const { isLoading, data, refetch } = usePackers();
    const [selectedPackerId, setSelectedPackerId] = useState<number | null>(null);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [intDocNumber, setIntDocNumber] = useState('');
    const { data: intDocs, isFetching } = usePacker(selectedPackerId);
    const { mutate, isError, error, isSuccess: isSuccessScan } = useAddIntDoc(
      Number(selectedPackerId),
      intDocNumber
    );
    const {mutate: syncMutate} = useSyncWithServer(isOnline, Number(selectedPackerId))
    const offLineTest = useOfflineAddIntDoc(Number(selectedPackerId), intDocNumber);
  
    useEffect(() => {
      if (isOnline) {
        syncMutate() 
      }
    }, [isOnline]);
  
  
  
    const getPackers = () => {
      if (!buttonClicked) {
        setButtonClicked(true);
        refetch();
      }
    };
  
    const setPacker = (packer: IPacker) => {
      alert(`Ви обрали пакувальника ${packer.name}`);
      setSelectedPackerId(packer.id);
      setShowForm(true);
    };
  
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
      event: React.FormEvent
    ) => {
      event.preventDefault();
      if (selectedPackerId && intDocNumber && isOnline) {
        try {
          await mutate();
          setIntDocNumber("");
        } catch (error) {
          alert("помилка");
        }
      }
      if (selectedPackerId && intDocNumber && !isOnline) {
        offLineTest();
        setIntDocNumber("");
          }
    };
    console.log(intDocs);
    
    return (
        <div className={s.container} style={{ padding: "20px" }}>
      <div className={s.networkStatus} style={{ backgroundColor: isOnline ? 'green' : 'red' }}>
        <p>{isOnline ? 'Мережа доступна' : 'Мережі немає. Виконується локальна обробка'}</p>
      </div>
      <h1>Тестова сторінка пакувальника</h1>
      <Button color="primary" onClick={() => getPackers()}>Завантажити пакувальників</Button>
      {buttonClicked ? (
        isLoading ? (
          <div>Loading...</div>
        ) : data?.length ? (
          <div>
            {data.map((packer) => (
              <div
                key={packer.id}
                onClick={() => setPacker(packer)}
                style={{
                  margin: "10px",
                  cursor: "pointer",
                  padding: "10px",
                  borderRadius: "8px",
                  boxShadow:
                    packer.id === selectedPackerId
                      ? "0 4px 8px rgba(0, 0, 0, 0.2)"
                      : "0 2px 4px rgba(0, 0, 0, 0.1)",
                  backgroundColor:
                    packer.id === selectedPackerId ? "#f0f8ff" : "transparent",
                }}
              >
                {packer.name}
              </div>
            ))}
            {showForm && (
              <div style={{ margin: "10px" }}>
                <form onSubmit={handleSubmit}>
                  <input
                    style={{
                      padding: "5px",
                      margin: "10px",
                      fontSize: "16px",
                      border: "1px solid #ccc",
                    }}
                    type="text"
                    placeholder="Введіть номер ттн"
                    value={intDocNumber}
                    onChange={(e) => setIntDocNumber(e.target.value)}
                  />
                  <Button color="primary" type="submit" >Скан</Button>
                </form>
                {isFetching && selectedPackerId ? (
                  <div>Loading packer details...</div>
                ) : intDocs !== null && intDocs !== undefined ? (
                  <div style={{ margin: "10px" }}>
                    <h2 style={{ margin: "10px" }}>ттн пакувальника</h2>
                    <h3 style={{ margin: "10px" }}>
                     Загальна Кількість: {intDocs.total}
                    </h3>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        ) : (
          <h2>Пакувальників не знайдено</h2>
        )
      ) : null}
      {isError && <ErrorToast message={`${error.response?.data.message}`} />}
    { (intDocs  ) && <PackerTable data={intDocs?.data ? intDocs.data : []}/>}
    </div>

    )
}
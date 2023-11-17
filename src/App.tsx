import s from "./App.module.scss";
import { useEffect, useState } from "react";
import { IPacker } from "./interfaces/packer.interface";
import { usePackers } from "./hooks/useAllPackers";
import { usePacker } from "./hooks/usePacker";
import { useAddIntDoc } from "./hooks/useAddIntDoc";
import ErrorToast from "./components/shared/ErrorToast";
import useOnlineStatus from "./hooks/useOnlineStatus";
import {  useOfflineAddIntDoc } from "./hooks/useOfflineAddIntDoc";
import { useSyncWithServer } from "./hooks/useSyncWithServer";

export const App: React.FC = () => {
  const isOnline = useOnlineStatus();

  const { isLoading, data, refetch } = usePackers();
  const [selectedPackerId, setSelectedPackerId] = useState<number | null>(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [intDocNumber, setIntDocNumber] = useState("");
  const { data: dataPacker, isFetching } = usePacker(selectedPackerId);
  const { mutate, isError, error } = useAddIntDoc(
    Number(selectedPackerId),
    intDocNumber
  );
  const {mutate: syncMutate, isLoading: isSyncLoading, isSuccess} = useSyncWithServer(isOnline, Number(selectedPackerId))
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
      setShowForm(true);
    }
  };

  const setPacker = (packer: IPacker) => {
    alert(`Ви обрали пакувальника ${packer.name}`);
    setSelectedPackerId(packer.id);
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

  return (
    <div className={s.container} style={{ padding: "20px" }}>
      <div className={s.networkStatus} style={{ backgroundColor: isOnline ? 'green' : 'red' }}>
        <p>{isOnline ? 'Мережа доступна' : 'Мережі немає. Виконується локальна обробка'}</p>
      </div>
      <h1>Тестова сторінка пакувальника</h1>
      <button onClick={() => getPackers()}>Завантажити пакувальників</button>
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
                  <button className={s.primary_button}>СКАН</button>
                </form>
                {isFetching && selectedPackerId ? (
                  <div>Loading packer details...</div>
                ) : dataPacker !== null && dataPacker !== undefined ? (
                  <div style={{ margin: "10px" }}>
                    <h2 style={{ margin: "10px" }}>ттн пакувальника</h2>
                    <h3 style={{ margin: "10px" }}>
                      Кількість: {dataPacker.intDocs.length}
                    </h3>
                    { dataPacker.intDocs.map((intDoc) => (    
                    
                      <div
                        key={intDoc.id}
                        style={{
                          backgroundColor: !!intDoc.addedOffline
                          ? "gray" 
                          : "#f8f8f8", 
                          padding: "5px",
                          marginBottom: "10px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          transition: "box-shadow 0.3s ease",
                          borderRadius: '10px'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.boxShadow =
                            "0 4px 8px rgba(0, 0, 0, 0.2)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.boxShadow =
                            "0 2px 4px rgba(0, 0, 0, 0.1)";
                        }}
                      >
                        <p style={{ fontSize: "16px", marginBottom: "5px" }}>
                          Номер: {intDoc.IntDocNumber}
                        </p>
                        <p style={{ fontSize: "14px", color: "#555" }}>
                          Час сканування: {intDoc.createdAt}
                        </p>
                      </div>
                    ))}
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
    </div>
  );
};
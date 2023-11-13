import s from "./App.module.scss";
import { useState } from "react";
import { IPacker } from "./interfaces/packer.interface";
import { usePackers } from "./hooks/useAllPackers";
import { usePacker } from "./hooks/usePacker";
import { useAddIntDoc } from "./hooks/useAddIntDoc";
import ErrorToast from "./components/shared/ErrorToast";

export const App: React.FC = () => {
  const { isLoading, data, refetch } = usePackers();
  const [selectedPackerId, setSelectedPackerId] = useState<number | null>(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [intDocNumber, setIntDocNumber] = useState("");
  const {
    isLoading: isLoadingPacker,
    data: dataPacker,
    refetch: fetchPacker,
    isFetching,
  } = usePacker(selectedPackerId);
  const { mutate, isError} = useAddIntDoc(Number(selectedPackerId), intDocNumber);
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
    if (selectedPackerId) {
        
      }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    if (selectedPackerId && intDocNumber) {
      try {
        await mutate();
        setIntDocNumber("");
      } catch (error) {
        alert("помилка");
      }
    }
  };


  return (
    <div className={s.container} style={{ padding: "20px" }}>
      <h1>Тестова сторінка покувальника</h1>
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
              <div>
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
                  <button
                    style={{
                      padding: "5px 10px",
                      fontSize: "16px",
                      backgroundColor: "blue",
                      color: "white",
                      border: "none",
                    }}
                  >
                    СКАН
                  </button>
                </form>
                {isFetching && selectedPackerId ? (
                  <div>Loading packer details...</div>
                ) : dataPacker !== null && dataPacker !== undefined ? (
                  <div>
                    <h2>ттн пакувальника</h2>
                    <h3>Кількість: {dataPacker.intDocs.length}</h3>
                    {dataPacker.intDocs.map((intDoc) => (
                      <div
                        key={intDoc.id}
                        style={{
                          backgroundColor: "#f8f8f8",
                          padding: "5px",
                          marginBottom: "10px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          transition: "box-shadow 0.3s ease",
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
          <h2>Покувальників не знайдено</h2>
        )
      ) : null}
      {isError && <ErrorToast message={'ШО ТИ ВВОДИШ, БАРАН?'}/>}
    </div>
  );
};

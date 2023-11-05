import s from "./App.module.scss";
import { useState } from "react";
import { IPacker } from "./interfaces/packer.interface";
import { usePackers } from "./hooks/usePackers";
import { packerService } from "./services/packer.service";

export const App: React.FC = () => {
  const { isLoading, data, refetch } = usePackers();
  const [selectedPackerId, setSelectedPackerId] = useState<number | null>(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [intDocNumber, setIntDocNumber] = useState("");

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
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedPackerId && intDocNumber) { 
        try { 
            await packerService.scanIntDoc(selectedPackerId, intDocNumber);
            alert('запит успішний');
            setIntDocNumber('')
        }
        catch(error) {
            alert('помилка ')
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
                style={{ margin: "10px", cursor: "pointer" }}
              >
                {packer.name}
              </div>
            ))}
            {showForm && (
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
                  Сабміт
                </button>
              </form>
            )}
          </div>
        ) : (
          <h2>Покувальників не знайдено</h2>
        )
      ) : null}
    </div>
  );
};

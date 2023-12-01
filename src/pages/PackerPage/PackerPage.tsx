import { useEffect, useState } from "react";
import s from "./PackerPage.module.scss";
import useOnlineStatus from "../../hooks/Packer/useOnlineStatus";
import { usePackers } from "../../hooks/Packer/useAllPackers";
import { useAddIntDoc } from "../../hooks/Packer/useAddIntDoc";
import { useOfflineAddIntDoc } from "../../hooks/Packer/useOfflineAddIntDoc";
import { useSyncWithServer } from "../../hooks/Packer/useSyncWithServer";
import { IPacker } from "../../interfaces/packer.interface";
import { Button } from "../../components/shared/ui/Button/Button";
import ErrorToast from "../../components/shared/ErrorToast";
import { PackerTable } from "../../components/packer/PackerTable/PackerTable";
import { useIntDocs } from "../../hooks/Packer/useIntDocs";
import { useSseIntDoc } from "../../hooks/Packer/useSseIntDoc";
import { Input } from "../../components/shared/ui/Input/Input";
import { Pagination } from "../../components/pagination/Pagination";

export const PackerPage: React.FC = () => {
  const isOnline = useOnlineStatus();
  useSseIntDoc();
  const { isLoading, data, refetch } = usePackers();
  const [selectedPackerId, setSelectedPackerId] = useState<number | null>(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [intDocNumber, setIntDocNumber] = useState("");
  const [currenetPage, setCurrentPage] = useState(1);
  const { data: intDocs, isFetching: isFetchingIntDocs } = useIntDocs(
    { page: currenetPage },
    Number(selectedPackerId)
  );

  

  const { mutate, isError, error } = useAddIntDoc(
    Number(selectedPackerId),
    intDocNumber
  );
  const { mutate: syncMutate } = useSyncWithServer(
    isOnline,
    Number(selectedPackerId)
  );
  const offLineAddIntDoc = useOfflineAddIntDoc(
    Number(selectedPackerId),
    intDocNumber
  );
  useEffect(() => {
    if (isOnline) {
      syncMutate();
    }
  }, [isOnline, syncMutate]);

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

  const onPageChangeHanlde = (newPage: number) => {
    setCurrentPage(newPage);
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
      offLineAddIntDoc();
      setIntDocNumber("");
    }
  };

  return (
    <div className={s.container} >
      
      <div
        className={s.networkStatus}
        style={{ backgroundColor: isOnline ? "green" : "red" }}
      >
        <p>
          {isOnline
            ? "Мережа доступна"
            : "Мережі немає. Виконується локальна обробка"}
        </p>
      </div>
      <div>
      <div className={s.packer} >
      <Button color="primary" onClick={() => getPackers()} style={{maxWidth: "200px"}}>
        Завантажити пакувальників
      </Button>
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
          
          </div>
        ) : (
          <h2>Пакувальників не знайдено</h2>
        )
      ) : null}
      <h3 style={{ margin: "10px" }}>
        Загальна Кількість:{" "}
        {!selectedPackerId ? intDocs?.total : intDocs?.total}
      </h3>
      </div>
      </div>
      <div className={s.table_container}>
        <div className={s.form_container}>
                <form onSubmit={handleSubmit} className={s.form_int_doc} >
                  <Input
                    variant="default"
                    type="number"
                    placeholder="Введіть номер ттн"
                    value={intDocNumber}
                    onChange={(e) => setIntDocNumber(e.target.value)}
                    disabled={!selectedPackerId}
                  
                  ></Input>
                  <Button color="primary" type="submit" disabled={!selectedPackerId}>
                    Скан
                  </Button>
                </form>
                <div className={s.filter_container}>
                <Input
                  variant='search'
                  type='text'
                  placeholder='Пошук'
                  />
                  <Input variant='select' placeholder="№ замовлення"/>
                </div>
                </div>   
      {isError && <ErrorToast message={`${error.response?.data.message}`} />}
      <div>
      { intDocs  && (
        <PackerTable data={intDocs?.data ? intDocs.data : []} />
      )}
      <div className={s.paginationContainer}>
        {!isFetchingIntDocs && (
          <Pagination
            siblingCount={1}
            total_pages={intDocs?.total_pages ? intDocs.total_pages : 1}
            current_page={currenetPage}
            next_page={intDocs?.next_page ? intDocs.next_page : ""}
            previous_page={intDocs?.previous_page ? intDocs?.previous_page : ""}
            onPageChange={(n) => onPageChangeHanlde(n)}
          />
        )}
           </div>
      </div>
      </div>
    </div>
  );
};

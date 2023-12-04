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
import { DropDown } from "../../components/shared/ui/DropDown/DropDown";
import { DropDownItem } from "../../components/shared/ui/DropDown/DropDownItem/DropDownItem";

export const PackerPage: React.FC = () => {
  const isOnline = useOnlineStatus();
  useSseIntDoc();
  const { isLoading, data: packersData, refetch } = usePackers();
  const [selectedPacker, setSelectedPacker] = useState<IPacker>();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [intDocNumber, setIntDocNumber] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  
  const { data: intDocs, isFetching: isFetchingIntDocs } = useIntDocs({page: currentPage, limit: perPage },
    Number(selectedPacker?.id)
  );
  const {current_page = 1, total_pages = 1,  } = intDocs ? intDocs : {} ;
  const { mutate, isError, error } = useAddIntDoc(
    Number(selectedPacker?.id),
    intDocNumber
  );
  const { mutate: syncMutate } = useSyncWithServer(
    isOnline,
    Number(selectedPacker?.id)
  );
  const offLineAddIntDoc = useOfflineAddIntDoc(
    Number(selectedPacker?.id),
    intDocNumber
  );
  useEffect(() => {
    if (isOnline) {
      syncMutate();
    }
  }, [isOnline, syncMutate]);

  const getPackers = () => {
      setButtonClicked(!buttonClicked);
      refetch();
  };

  const setPacker = (packer: IPacker) => {
    setSelectedPacker(packer);
    setButtonClicked(prev => !!prev);
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    if (selectedPacker?.id && intDocNumber && isOnline) {
         mutate();
        setIntDocNumber("");   
    }
    if (selectedPacker?.id && intDocNumber && !isOnline) {
      offLineAddIntDoc();
      setIntDocNumber("");
    }
  };
  return (
    <div className={s.container}>
      <div className={s.packer_container}>
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
        <div className={s.packer}>
          <div className={s.primaryButtonContainer}>
          <Button color='primary' onClick={() => getPackers()}>{selectedPacker?.name || 'Додати пакувальника'}</Button>
          </div>
        <DropDown active={buttonClicked} onToggle={() => setButtonClicked(!buttonClicked)}>
          {packersData?.map(packer => (
            <DropDownItem key={packer.id} data={packer.name} onClick={() => setPacker(packer)}/>
          ))}
          <Button color='primary' style={{width: "100%"}}>Додати пакувальника</Button>
        </DropDown>
        </div>
        </div>
      <div className={s.table_container}>
        <div className={s.form_container}>
          <form onSubmit={handleSubmit} className={s.form_int_doc}>
            <Input
              variant="default"
              type="number"
              placeholder="Введіть номер ттн"
              value={intDocNumber}
              onChange={(e) => setIntDocNumber(e.target.value)}
              disabled={!selectedPacker?.id}
            ></Input>
            <Button color="primary" type="submit" disabled={!selectedPacker?.id}>
              Скан
            </Button>
          </form>
          <div className={s.filter_container}>
            <Input variant="search" type="text" placeholder="Пошук" />
            <Input variant="select" placeholder="№ замовлення" />
          </div>
        </div>
        {isError && <ErrorToast message={`${error.response?.data.message}`} />}
        <div>
          {intDocs && <PackerTable data={intDocs?.data ? intDocs.data : []} />}
          <div className={s.paginationContainer}>
            {!isFetchingIntDocs && (
              <Pagination
                siblingCount={1}
                total_pages={total_pages}
                current_page={current_page}
                per_page={perPage}
                onPageChange={(n) => setCurrentPage(n)}
                onPerPageChange={(e) => setPerPage(e)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import s from "./PackerPage.module.scss";
import useOnlineStatus from "hooks/Packer/useOnlineStatus";
import { useAddIntDoc } from "hooks/Packer/useAddIntDoc";
import { useOfflineAddIntDoc } from "hooks/Packer/useOfflineAddIntDoc";
import { useSyncWithServer } from "hooks/Packer/useSyncWithServer";
import { IPacker } from "interfaces/packer.interface";
import { Button } from "components/shared/ui/Button/Button";
import {ErrorToast} from "components/shared/ErrorToast";
import { PackerTable } from "components/packer/PackerTable/PackerTable";
import { useIntDocs } from "hooks/Packer/useIntDocs";
import { Pagination } from "components/pagination/Pagination";
import { NetworkStatus } from "components/networkStatus/networkStatus";
import { DropDownPacker } from "components/packer/DropDownPacker/DropDownPacker";
import { SearchPackerForm } from "components/packer/SearchPackerForm/SearchPackerForm";
import { Input } from "components/shared/ui/Input/Input";
import { usePackers } from "hooks/Packer/useAllPackers";
import { LocalStorageManager } from "local-storage";

export const PackerPage: React.FC = () => {
  const isOnline = useOnlineStatus();
  const localStorage = new LocalStorageManager<IPacker>('packer')
  const packerSavedInLocal = localStorage.getData()
  const [selectedPacker, setSelectedPacker] = useState<IPacker>(packerSavedInLocal[0]);
  const [intDocNumber, setIntDocNumber] = useState("");
 
  const [perPage, setPerPage] = useState(20);
  const [query, setQuery] = useState({filter: '', search: ''})
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: intDocs,
    isFetching: isFetchingIntDocs,
    isSuccess: isSuccessIntDocs,
  

  } = useIntDocs(
    { page:  query.search ? 1: currentPage , limit: perPage, filter: query.filter, search: query.search },
    Number(selectedPacker?.id)
  );
  
  const { current_page = 1, total_pages = 1 } = intDocs ? intDocs : {};

  const { mutate, isError, error } = useAddIntDoc(
    Number(selectedPacker?.id),
    intDocNumber
  );
  const {
    isLoading: isLoadingPacker,
    isSuccess: isSuccesPacker,
    data: packersData,
    refetch,
  } = usePackers();
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

  const setPacker = (packer: IPacker) => {
    setSelectedPacker(packer);
    };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    if (selectedPacker?.id && intDocNumber && isOnline) {
      await mutate();
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
{  !isOnline &&    <NetworkStatus isOnline={isOnline} />}       
 <div className={s.packer}>
          {
            <DropDownPacker
              setPacker={setPacker}
              getPacker={refetch}
              packersData={packersData ? packersData : []}
              buttonValue={selectedPacker ? selectedPacker.name : ""}
            />
          }
        </div>
      </div>
 
        <div className={s.table_container}>
          <div className={s.form_container}>
            <form onSubmit={handleSubmit} className={s.form_int_doc}>
              <Input
                variant="default"
                placeholder="Введіть номер ттн"
                value={intDocNumber}
                type="number"
                onChange={(e) => setIntDocNumber(e.target.value)}
                disabled={!selectedPacker?.id}
              ></Input>
              <Button
                variant="default"
                color="secondary"
                type="submit"
                disabled={!selectedPacker?.id}
              >
                Скан
              </Button>
            </form>
            <div className={s.filter_container}>
              <SearchPackerForm onSearch={(search, filter) => setQuery({search, filter})} />
            </div>
          </div>
          {isError && (
            <ErrorToast message={`${error.response?.data.message}`} />
          )}
          <div>
            {intDocs && isSuccessIntDocs && (
              <PackerTable data={intDocs?.data ? intDocs.data : []} />
            )}
            <div className={s.paginationContainer}>
              {isSuccessIntDocs &&  intDocs.data.length > 1 && (
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

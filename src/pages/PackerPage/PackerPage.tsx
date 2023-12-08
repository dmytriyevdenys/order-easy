import { useEffect, useRef, useState } from "react";
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
import { useOnClickOutside } from "../../hooks/useClickOutside";
import { NetworkStatus } from "../../components/networkStatus/networkStatus";
import { DropDownPacker } from "../../components/packer/DropDownPacker/DropDownPacker";
import { SearchPackerForm } from "../../components/packer/SearchPackerForm/SearchPackerForm";

export const PackerPage: React.FC = () => {
  const isOnline = useOnlineStatus();
  const refDropDown = useRef(null);
  const { isLoading: isLoadingPacker, isSuccess: isSuccesPacker, data: packersData, refetch } = usePackers();
  const [selectedPacker, setSelectedPacker] = useState<IPacker>();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [intDocNumber, setIntDocNumber] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  
  const { data: intDocs, isFetching: isFetchingIntDocs, isSuccess: isSuccessIntDocs } = useIntDocs({page: currentPage, limit: perPage },
    Number(selectedPacker?.id)
  );
  const {current_page = 1, total_pages = 1,  } = intDocs ? intDocs : {} ;
  const { mutate, isError, error } = useAddIntDoc(
    Number(selectedPacker?.id),
    intDocNumber
  );
  const { mutate: syncMutate } = useSyncWithServer(isOnline,Number(selectedPacker?.id)
  );
  const offLineAddIntDoc = useOfflineAddIntDoc( Number(selectedPacker?.id),intDocNumber);
  
  useEffect(() => {
    if (isOnline) {
      syncMutate();
    }
  }, [isOnline, syncMutate]);

  const getPackers = () => {
    setButtonClicked((prev) => !prev)

    !buttonClicked &&  refetch();
  };

  const setPacker = (packer: IPacker) => {
    setSelectedPacker(packer);
    setButtonClicked(false);
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
  useOnClickOutside({ref: refDropDown, handler: () => setButtonClicked(false)});
  useSseIntDoc({page: currentPage, limit: perPage});

  return (
    <div className={s.container}>
      <div className={s.packer_container}>
        <NetworkStatus isOnline={isOnline} />
        <div className={s.packer} ref={refDropDown}>
          <div className={s.primaryButtonContainer}>
          <Button variant='addLarge' color='primary' leftElement rightElement onClick={() => getPackers()}>{selectedPacker?.name || 'Обрати'}</Button>
          </div>
        {(buttonClicked && isSuccesPacker) && <div><DropDownPacker packersData={packersData} setPacker={setPacker}/>
        </div> 
        }
        </div>
        </div>
        {isSuccessIntDocs && 
      <div className={s.table_container}>
        <div className={s.form_container}>
          <form onSubmit={handleSubmit} className={s.form_int_doc}>
            <Input
              variant="default"
              placeholder="Введіть номер ттн"
              value={intDocNumber}
              type='number'
              onChange={(e) => setIntDocNumber(e.target.value)}
              disabled={!selectedPacker?.id}
            ></Input>
            <Button variant='default' color='primary' type="submit" disabled={!selectedPacker?.id}>
              Скан
            </Button>
          </form>
          <div className={s.filter_container}>
          <SearchPackerForm/>
          </div>
        </div>
        {isError && <ErrorToast message={`${error.response?.data.message}`} />}
        <div>
          {(intDocs && isSuccessIntDocs )&& <PackerTable data={intDocs?.data ? intDocs.data : []} />}
          <div className={s.paginationContainer}>
            {intDocs.data.length > 1 &&(
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
      
      </div>}
    </div>
  );
};
import { useState } from "react";
import { useGetStatuses } from "../useGetStatus";
import { TStatus } from "types/order/status.type";

export const useStatusDropDown = (currentStatus?: TStatus) => {
    const { data, isSuccess } = useGetStatuses();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<TStatus | undefined>((isSuccess && data[0]) || currentStatus  );
  
    const handleOpenDropDown = () => {
     setIsOpen(prev => !prev)
    };  

    const closeDropDown =  () => setIsOpen(false);
    console.log(status);
    
    return {
        handleOpenDropDown,
        closeDropDown,
        setStatus,
        status,
        isOpen,
        data
    }
}
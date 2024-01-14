import { DropDown } from "components/shared/ui/DropDown/DropDown"
import s from "./ManagerDropDown.module.scss"
import { useGetManagers } from "hooks/Order/useGetManagers"
import { DropDownItem } from "components/shared/ui/DropDown/DropDownItem/DropDownItem";
import { useState } from "react";

type TManager = { 
    manager_id: number;
    manager_name: string;
}
export const ManagerDropDown = () => {
    const {data, isSuccess} = useGetManagers();
    const [manager, setManager] = useState<TManager>();

    const setManagerHandle = (manager: TManager | null) => {
       manager !== null && setManager(manager)
    }
    return (
        <div className={s.container} >
            <DropDown 
            showElement='input'
            closeToClickElement
            value={manager?.manager_name} 
            >
                {isSuccess && data?.map(manager => (
                    <div className={s.list_container} key={manager?.manager_id}>
                    <DropDownItem 
                    data={manager?.manager_name}
                    onClick={() => setManagerHandle(manager)}
                    />  
                     </div>   
                ))}
            </DropDown>
        </div>
    )
}
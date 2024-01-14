import { useGetStatuses } from "hooks/Order/useGetStatus"
import s from "./StatusDropDown.module.scss"
import { DropDown } from "components/shared/ui/DropDown/DropDown";
import { DropDownItem } from "components/shared/ui/DropDown/DropDownItem/DropDownItem";

export const StatusDropDown: React.FC = () => {
    const {data, refetch} = useGetStatuses();

    return (
        <div className={s.container}>
            <DropDown showElement='input' onClick={() => refetch()} >
                {data?.map(status => (
                    <DropDownItem key={status.id} data={status.name}/>
                ))}
            </DropDown>
        </div>
    )
}
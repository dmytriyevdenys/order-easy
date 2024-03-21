import { TWarehouse } from "interfaces/order/warehouse.type";
import { ListElementBlockLabel } from "../../../ToggleBlockLabel/ListElementBlockLabel/ListElementBlockLabel";

export const AddressListElement: React.FC<TWarehouse> = (address) => {
    const text = `${address.CityDescription}, відділення № ${address.Number}`
    return (
        <>
            <ListElementBlockLabel text={text} toConfirm={() => {}} cancel={() => {}}/>    
        </>
    )
}
import { ChangeEvent, useState } from "react";
import { useGetSources } from "../useGetSource";
import { OrderAssociations } from "../../../interfaces/order/order-associations";

export const useSourceDropDown= () => {
    const { data } = useGetSources();
  const [showDropDown, setShowDropDown] = useState(false);
  const [sourceName, setSourceName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceId, setSourceId] = useState<number | null>(null);

  const handleShowDropDown = () => {
    setShowDropDown((prev) => !prev);
  };

  const filteredData = data?.filter((source) =>
    source.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOnChange = (v: ChangeEvent<HTMLInputElement>) => {
    const value = v.target.value
    setSearchTerm(value);
    setSourceName(value);
  };

  const handleSetSource = (source: OrderAssociations) => {
    setSourceName(source.name);
    setSourceId(source.id)
  };

  return {
    showDropDown,
    handleShowDropDown,
    sourceName,
    handleOnChange,
    filteredData,
    handleSetSource,
    sourceId,
    setSourceName,
    setShowDropDown
  };
};


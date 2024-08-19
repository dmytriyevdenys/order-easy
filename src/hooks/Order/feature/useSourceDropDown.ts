import { ChangeEvent, useState } from "react";
import { useGetSources } from "../useGetSource";
import { TSource } from "types/order/source.type";

export const useSourceDropDown= (curentSource?: TSource) => {
    const { data } = useGetSources();
  const [source, setSource] = useState<TSource | null>(curentSource || null);
  const [showDropDown, setShowDropDown] = useState(false);
  const [sourceName, setSourceName] = useState(source?.name || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [source_id, setSourceId] = useState<number | null>(null);

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

  const handleSetSource = (source: TSource) => {
    setSource(source);
    setSourceName(source.name);
    setSourceId(source.id);
    setSearchTerm('');
  };  
  return {
    source,
    showDropDown,
    handleShowDropDown,
    sourceName,
    handleOnChange,
    filteredData,
    handleSetSource,
    source_id,
    setSourceName,
    setShowDropDown
  };
};


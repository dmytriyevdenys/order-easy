import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../../shared/ui/Input/Input";
import s from "./SearchPackerForm.module.scss";
import { DropDown } from "../../shared/ui/DropDown/DropDown";
import { DropDownItem } from "../../shared/ui/DropDown/DropDownItem/DropDownItem";
import { useDebounce } from "../../../utils/useDebounce";

type SearchPackerFormProps = {
  onSearch?: (search: string, filter: string) => void;
};

type FilterOption = {
  label: string;
  value: "IntDocNumber" | "order_id";
};

export const SearchPackerForm: React.FC<SearchPackerFormProps> = ({
  onSearch,
}) => {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterOption | null>(
    null
  );
  const [error, setError] = useState("");

  const filterOptions: FilterOption[] = [
    { label: "№ замовлення", value: "order_id" },
    { label: "№ ТТН", value: "IntDocNumber" },
  ];
  const debouncedSearch = useDebounce(search, 500);

  const handleSearch = () => {
    selectedFilter?.value && setError("");
    onSearch &&
      selectedFilter?.value &&
      onSearch(
        debouncedSearch,
        selectedFilter?.value ? selectedFilter.value : ""
      );
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    !selectedFilter?.value && setError("Виберіть фільтр");
    setSearch(e.target.value);
  };
  useEffect(() => {
    handleSearch();
  }, [debouncedSearch, search, selectedFilter?.value]);
  return (
    <div className={s.form}>
      <Input
        variant="search"
        placeholder="Пошук"
        value={search}
        onChange={handleOnChange}
        error={error}
      />
      <div className={s.input_container}>
        <DropDown
          showElement="input"
          readonlyInput
          value={selectedFilter?.label}
          placeholder="Оберіть фільтр"
          closeToClickElement
        >
          <div className={s.drop_down_list}>
            {filterOptions.map((option, index) => (
              <DropDownItem
                key={index}
                data={option.label}
                onClick={() => {
                  setSelectedFilter(option);
                }}
              />
            ))}
          </div>
        </DropDown>
      </div>
    </div>
  );
};

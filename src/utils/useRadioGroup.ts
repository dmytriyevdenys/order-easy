import { useState } from "react";

export const useRadioGroup = (initialValue: string) => {
  const [selectedOption, setSelectedOption] = useState(initialValue);

  const handleChange = (value: string) => {
    setSelectedOption(value);
  };

  return { selectedOption, handleChange };
};

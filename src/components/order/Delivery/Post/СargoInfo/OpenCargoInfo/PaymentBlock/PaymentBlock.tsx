import React, { useState } from "react";
import s from "./PaymentBlock.module.scss";

type PaymentBlockProps = {
  textBlock: string;
};

export const PaymentOption: React.FC<{
  label: string;
  checked: boolean;
  onChange: () => void;
}> = ({ label, checked, onChange }) => {
  return (
    <div className={s.payment_block}>
      <label>{label}</label>
      <input type="radio" checked={checked} onChange={onChange} />
    </div>
  );
};

export const PaymentBlock: React.FC<PaymentBlockProps> = ({ textBlock }) => {
  const [selectedOption, setSelectedOption] = useState("recipient"); 

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className={s.form_of_payments}>
      <p>{textBlock}</p>
      <div className={s.payment_blocks}>
        <PaymentOption
          label="Отримувач"
          checked={selectedOption === "recipient"}
          onChange={() => handleOptionChange("recipient")}
        />
        <PaymentOption
          label="Відправник"
          checked={selectedOption === "sender"}
          onChange={() => handleOptionChange("sender")}
        />
      </div>
    </div>
  );
};


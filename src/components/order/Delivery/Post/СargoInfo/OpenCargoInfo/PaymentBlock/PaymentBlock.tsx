import React, { useState } from "react";
import s from "./PaymentBlock.module.scss";
import { Radio } from "components/shared/ui/Radio/Radio";
import { useRadioGroup } from "utils/useRadioGroup";

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
      <Radio colorDefault label={label} checked={checked} onChange={onChange} />
    </div>
  );
};

export const PaymentBlock: React.FC<PaymentBlockProps> = ({ textBlock }) => {
const {selectedOption, handleChange} = useRadioGroup('recipient');

  return (
    <div className={s.form_of_payments}>
      <p>{textBlock}</p>
      <div className={s.payment_blocks}>
        <PaymentOption
          label="Отримувач"
          checked={selectedOption === "recipient"}
          onChange={() => handleChange("recipient")}
        />
        <PaymentOption
          label="Відправник"
          checked={selectedOption === "sender"}
          onChange={() => handleChange("sender")}
        />
      </div>
    </div>
  );
};


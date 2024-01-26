import React, { ChangeEvent, useEffect, useState, useRef } from "react";
import s from "./Additionalnformation.module.scss";
import { TProduct } from "interfaces/products/products.type";

type AdditionalInformationProps = {
  products: TProduct[];
  additionalInformation?: string;
  newProduct: TProduct | null;
};

export const AdditionalInformation: React.FC<AdditionalInformationProps> = ({ products, additionalInformation }) => {
  const [productsString, setProductsString] = useState<string>('');  
  const [value, setValue] = useState<string>(additionalInformation || '');
  const [inputText, setInputText] = useState<string>(additionalInformation || '');

  const [isActive, setIsActive] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);  
 
  const updateValue = (products: string, inputText: string) => {
    setValue(`${products} ${inputText}`);
  };
const productsText = products.map((product) =>
  product.quantity && product.quantity > 1
    ? `${product.name}-${product.quantity}шт`
    : product.name
).join(', ');

  useEffect(() => {
    setProductsString(productsText);
    if (additionalInformation) {
      setValue(additionalInformation);
    } else {
      updateValue(productsString, inputText);
    }
  }, [products, additionalInformation, productsString]);

  const handleContainerBlur = () => {
    setIsActive((prev) => !prev);
  };

  const handleContainerClick = () => {
    setIsActive(true);
  };

  const getDifference = (prev: string, current: string) => {
    const currentWords = current.split(' ');
    const prevWords = prev.split(' ');
    const newWords = currentWords.filter(word => !prevWords.includes(word));
    return newWords;
  };

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const newInputText = getDifference(productsString, newValue).join(', ');
    setInputText(newInputText);
    setValue(newValue);
  };

  return (
    <div className={s.container} onClick={handleContainerClick} onBlur={handleContainerBlur} ref={containerRef}>
      {isActive ? (
        <textarea
          ref={textareaRef}
          className={s.textarea}
          value={value}
          onChange={(e) => {
            handleOnChange(e);
          }}
          autoFocus
          style={{ height: containerRef.current?.clientHeight }}
        />
      ) : (
        <div className={s.value}>{value}</div>
      )}
    </div>
  );
};

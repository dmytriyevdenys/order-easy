import React, { ChangeEvent, useEffect, useState, useRef } from "react";
import s from "./Additionalnformation.module.scss";
import { TProduct } from "interfaces/products/products.type";
import { Textarea } from "components/shared/ui/Textarea/Textarea";
import { useTextAreaHeight } from "utils/useTextareaHeight";

type AdditionalInformationProps = {
  products?: TProduct[];
  additionalInformation?: string;
};

export const AdditionalInformation: React.FC<AdditionalInformationProps> = ({
  products,
  additionalInformation,
}) => {
  const [value, setValue] = useState<string>("");

  const [isActive, setIsActive] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialProductsRef = useRef<Set<string>>(new Set());

  const { height } = useTextAreaHeight({
    textareaRef,
    containerRef,
    isActive,
    text: value,
  });

  useEffect(() => {
    if (additionalInformation) {
      setValue(additionalInformation);
    }
  }, [additionalInformation]);

  useEffect(() => {
    if (products && products.length > 0) {
      const newProductsText = products
        .map((product) =>
          product.quantity && product.quantity > 1
            ? `${product.name}-${product.quantity}шт`
            : product.name
        )
        .join(", ");
      
      setValue(prevValue => {
        if (!prevValue.trim()) {
          return newProductsText;
        } else {
          const prevProductsText = Array.from(initialProductsRef.current).join(", ");
          return `${prevValue}, ${newProductsText.replace(prevProductsText, "")}`;
        }
      });
      
      products.forEach(product => initialProductsRef.current.add(product.name));
    }
  }, [products]);

  const handleContainerBlur = () => {
    setIsActive(false);
  };

  const handleContainerClick = () => {
    setIsActive(true);
  };

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div
      className={s.container}
      onClick={handleContainerClick}
      onBlur={handleContainerBlur}
      ref={containerRef}
    >
      {isActive ? (
        <Textarea
          value={value}
          ref={textareaRef}
          onChange={handleOnChange}
          autoFocus
          style={{ height, padding: '2px' }}
        />
      ) : (
        <div className={s.value}>{value}</div>
      )}
    </div>
  );
};

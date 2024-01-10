import {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { TProduct } from "../../../interfaces/products/products.type";
import s from "./ProductDropDownItem.module.scss";
import { Input } from "../../shared/ui/Input/Input";

type ProductDropDownItemProps = {
  product: TProduct;
  addProduct?: (product: TProduct) => void;
  removeCheckProduct?: (productId: number) => void;
  updateProduct: (updatedProduct: TProduct) => void;
  addedProductsIds?: number[];
};

export const ProductDropDownItem: React.FC<ProductDropDownItemProps> = ({
  product,
  addProduct,
  removeCheckProduct,
  addedProductsIds,
  updateProduct,
}) => {
  const amountRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [clicked, setClicked] = useState({ amount: false, price: false });
  const [productItem, setProductItem] = useState<TProduct>({
    ...product,
    quantity: product.indexId ? product.quantity: 1,
    price: product.indexId ? product.price : product.price || 0,
  });
  const { id: productId, name: productName, quantity, price } = productItem;
  const [checkedProduct, setCheckedProduct] = useState(
    addedProductsIds && addedProductsIds.includes(productId)
  );

  const handleCheckboxChange = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (
      inputRef.current === document.activeElement ||
      e.target === amountRef.current ||
      e.target === priceRef.current
    ) {
      return;
    }
    const isChecked = !checkedProduct;
    setCheckedProduct(isChecked);

    (isChecked && addProduct) && addProduct(productItem);
    (!isChecked && removeCheckProduct) && removeCheckProduct(productId);
  };

  const handleUpdateProduct = (
    e: ChangeEvent<HTMLInputElement>,
    input: "quantity" | "price"
  ) => {
    if (input === "quantity") {
      setProductItem({
        ...productItem,
        quantity: Number(e.target.value),
      });
      updateProduct({
        ...productItem,
        quantity: Number(e.target.value),
      });
    }
    if (input === "price") {
      setProductItem({
        ...productItem,
        price: Number(e.target.value),
      });
      updateProduct({
        ...productItem,
        price: Number(e.target.value),
      });
    }
  };
  
  useEffect(() => {
    addedProductsIds && !addedProductsIds.length && setCheckedProduct(false);
  }, [addedProductsIds]);


  
  return (
    <div className={s.container} onClick={handleCheckboxChange}>
      <div className={s.dicription}>
        <input type="checkbox" checked={checkedProduct} onChange={() => {}} />
        <span className={s.name_product}>{productName}</span>
      </div>
      <div className={s.amount_price_container}>
        {!clicked.amount ? (
          <div
            ref={amountRef}
            className={s.amount}
            onClick={() => setClicked({ amount: true, price: false })}
            onBlur={() => setClicked({ amount: false, price: false })}
          >
            {quantity}
          </div>
        ) : (
          <div className={s.amount}>
            <Input
              variant="default"
              type="number"
              autoFocus
              onChange={(e) => handleUpdateProduct(e, "quantity")}
              onBlur={() => setClicked({ amount: false, price: false })}
              ref={inputRef}
            />
          </div>
        )}
        {clicked.price && (
          <div className={s.price}>
            <Input
              variant="default"
              type="number"
              autoFocus
              onChange={(e) => handleUpdateProduct(e, "price")}
              onBlur={() => setClicked({ amount: false, price: false })}
              ref={inputRef}
            />
          </div>
        )}
        {!clicked.price && (
          <span
            ref={priceRef}
            onClick={() => setClicked({ amount: false, price: true })}
            onBlur={() => setClicked({ amount: false, price: false })}
          >
            {price} грн
          </span>
        )}
      </div>
    </div>
  );
};

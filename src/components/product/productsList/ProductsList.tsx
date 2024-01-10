import { TProduct } from "interfaces/products/products.type";
import s from "./ProductsList.module.scss";
import { ProductListItem } from "./ProductListItem/ProductListItem";
import { useEffect, useRef } from "react";

type ProductsListProps = {
  products: TProduct[];
  isActiveDropDown: boolean;
  openDropDown: () => void;
  removeProduct: (product: TProduct) => void;
  updateProduct: (product: TProduct) => void;
  onProductClick: (product: TProduct) => void;
};
export const ProductsList: React.FC<ProductsListProps> = ({
  products,
  removeProduct,
  openDropDown,
  onProductClick,
  isActiveDropDown,
}) => {
  const containerRef = useRef<HTMLDivElement>(null); 
  const containerClass = isActiveDropDown ? `${s.container} ${s.is_active}`: s.container;
  useEffect(() => {
    if (isActiveDropDown && containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [products, isActiveDropDown]);
  return (
    <div className={containerClass} ref={containerRef}>
      {products.map((product, index) => (
        <div key={index} >
          <ProductListItem product={product} removeProduct={removeProduct} onProductClick={onProductClick} />
        </div>
      ))}
      {!isActiveDropDown && products.length > 0 && (
        <button className={s.button} onClick={openDropDown}>
          додати
        </button>
      )}
    </div>
  );
};

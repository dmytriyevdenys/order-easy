import { TProduct } from "../../../interfaces/products/products.type";
import s from "./ProductsList.module.scss";
import { ReactComponent as CloseIcon } from "../../../assets/icons/orderIcons/close.svg";

type ProductsListProps = {
  products: TProduct[];
  isActiveDropDown: boolean;
  openDropDown: () => void;
  removeProduct: (productId: number) => void;
};
export const ProductsList: React.FC<ProductsListProps> = ({
  products,
  removeProduct,
  openDropDown,
  isActiveDropDown,
}) => {
  return (
    <div className={s.container}>
      {products.map((product, index) => (
        <div key={index} className={s.product_item}>
          <span>
            {product.quantity !== null && product?.quantity > 1
              ? `${product.name} -${product.quantity}шт`
              : product.name}
          </span>
          <div onClick={() => removeProduct(product.id)}>
            <CloseIcon />
          </div>
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

import { TProduct } from "../../../../interfaces/products/products.type"
import { ReactComponent as CloseIcon } from "../../../../assets/icons/orderIcons/close.svg";
import s from "./ProductListItem.module.scss"

type ProductListItemProps = {
    product: TProduct,
    removeProduct: (product: TProduct) => void;
    onProductClick: (product: TProduct) => void;
}
export const ProductListItem: React.FC<ProductListItemProps> = ({product, removeProduct,onProductClick }) => {
    return (
        <div className={s.container}>
            <div className={s.product_item} >
            <span onClick={() => onProductClick(product)} title={`ціна ${product.price} грн`} >
            {product.quantity !== null && product?.quantity > 1
              ? `${product.name} -${product.quantity}шт`
              : product.name}
          </span>
          <div onClick={() => removeProduct(product)}>
            <CloseIcon />
          </div>
            </div>
        </div>
    )
}
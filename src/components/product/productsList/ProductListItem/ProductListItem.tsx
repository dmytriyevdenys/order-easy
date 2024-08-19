import { TProduct } from "types/products/products.type";
import { ReactComponent as CloseIcon } from "assets/icons/orderIcons/close.svg";
import s from "./ProductListItem.module.scss";
import { useSortable } from "@dnd-kit/sortable";

type ProductListItemProps = {
  product: TProduct;
  removeProduct: (product: TProduct) => void;
  onProductClick: (product: TProduct) => void;
  index: number;
};
export const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  removeProduct,
  onProductClick,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition,  } =
    useSortable({ id: product.indexId, data: product,  });

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : "none",
        transition,
      }}
      className={s.container}
    >
      <div className={s.product_item}>
        <span
          onClick={() => onProductClick(product)}
          title={`ціна ${product.price} грн`}
        >
          {product.quantity !== null && product?.quantity > 1
            ? `${product.name} -${product.quantity}шт`
            : product.name}
        </span>
        <div onClick={() => removeProduct(product)}>
          <CloseIcon />
        </div>
      </div>
    </div>
  );
};

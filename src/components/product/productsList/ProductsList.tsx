import { TProduct } from "interfaces/products/products.type";
import s from "./ProductsList.module.scss";
import { ProductListItem } from "./ProductListItem/ProductListItem";
import { useEffect, useRef, useState } from "react";
import { Button } from "components/shared/ui/Buttons/Button/Button";
import { DndContext, DragOverEvent, DragOverlay, DragStartEvent, useDroppable } from "@dnd-kit/core";
import { SortableContext, } from "@dnd-kit/sortable";

type ProductsListProps = {
  products: TProduct[];
  isActiveDropDown: boolean;
  openDropDown: () => void;
  removeProduct: (product: TProduct) => void;
  updateProduct: (product: TProduct) => void;
  onProductClick: (product: TProduct) => void;
  setProducts: React.Dispatch<React.SetStateAction<TProduct[]>>;
};
export const ProductsList: React.FC<ProductsListProps> = ({
  products,
  removeProduct,
  openDropDown,
  onProductClick,
  setProducts,
  isActiveDropDown,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeDragProduct, setActiveDragProduct] = useState<TProduct | null>(null)
  const containerClass = isActiveDropDown ? `${s.container} ${s.is_active}`: s.container;
  useEffect(() => {
    if (isActiveDropDown && containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [products, isActiveDropDown]);

  const {setNodeRef} = useDroppable({id: 'id'})

  const hanldeDragStart = (e: DragStartEvent) => {
    if (e.active.data) {
      const draggedOrder = e.active.data?.current as TProduct ;
      setActiveDragProduct(draggedOrder);
      
    }
  }
  const handleDragEnd = (e: DragOverEvent) => {
    const { active, over } = e;
    const oldProduct = active.data.current as TProduct;
    const newProduct = over?.data.current as TProduct;
    setProducts((products) => {
      const sortProducts = products.map((product) => {
        if (product.indexId === oldProduct.indexId) {
          product.indexId = newProduct.indexId;
        } else if (product.indexId === newProduct.indexId) {
          product.indexId = oldProduct.indexId;
        }
        return product;
      }).sort((a,b) => a.indexId - b.indexId);      
      return sortProducts;
    });
  };
  return (
    <DndContext onDragStart={hanldeDragStart} onDragEnd={handleDragEnd}>

        <div className={containerClass} ref={containerRef}>
                <SortableContext items={products.map(product => product.indexId)} >  
          {products.map((product, index) => (
             <div ref={setNodeRef} key={index}>
              <ProductListItem
                key={index}
                index={product.indexId}
                product={product}
                removeProduct={removeProduct}
                onProductClick={onProductClick}
              />
               </div>
          ))}
            
          {!isActiveDropDown && products.length > 0 && (
            <Button
              variant="mini"
              style={{ width: "70px" }}
              onClick={openDropDown}
            >
              Додати
            </Button>
          )}
           </SortableContext>
        </div>
     
      <DragOverlay>
              {activeDragProduct && 
              <ProductListItem product={activeDragProduct} index={activeDragProduct.indexId} removeProduct={removeProduct} onProductClick={onProductClick}/>
            }
              </DragOverlay>
    </DndContext>
  );
};

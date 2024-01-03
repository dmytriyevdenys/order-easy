import { useState } from "react";
import { useGetProductsToOrder } from "../../../hooks/Product/useGetProductToOrder";
import { Button } from "../../shared/ui/Button/Button";
import { DropDown } from "../../shared/ui/DropDown/DropDown";
import { ProductDropDownItem } from "../productDropDownItem/ProductDropDownItem";
import s from "./AddProductsDropDown.module.scss";
import { TProduct } from "../../../interfaces/products/products.type";
import { Input } from "../../shared/ui/Input/Input";
import { ProductsList } from "../productsList/ProductsList";
import { useDebounce } from "../../../utils/useDebounce";

export const AddProductsDropDown: React.FC = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [addedProductsIds, setAddedProductsIds] = useState<number[]>([]);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 500);
  const { data: dataProducts } = useGetProductsToOrder(debouncedSearch);

  const addProduct = (product: TProduct) => {
    setProducts((prevProduct) => [...prevProduct, product]);
    setAddedProductsIds(prevIds => [...prevIds, product.id]);
  };
  const removeProduct = (productId: number) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    const updatedIds = addedProductsIds.filter(
      (id) => id !== productId
    )
    setProducts(updatedProducts);
    setAddedProductsIds(updatedIds);
  };

  const updateProduct = (updatedProduct: TProduct) => {
    const index = products.findIndex((product) => product.id === updatedProduct.id);  
  if (index !== -1) {
    const updatedProducts = [...products];
    updatedProducts[index] = updatedProduct;
    
    setProducts(updatedProducts);
  }
  }

  const cancel = () => {
    setAddedProductsIds([]);
    setProducts([]);
    setSearch('');
    setButtonClicked(false);
  }

  const toConfirm = () => {
    setAddedProductsIds([]);
    setSearch('');
    setButtonClicked(false);
  }

  const onButtonClickHandle =  () => {
    setButtonClicked((prev) => !prev);
  };

  
    return (
    <div className={s.add_products_container}>
      <ProductsList
        products={products}
        removeProduct={removeProduct}
        isActiveDropDown={buttonClicked}
        openDropDown={onButtonClickHandle}
      />
      {!buttonClicked && !products.length && (
        <Button
          variant="addLarge"
          color="hover"
          rightElement
          withFull
          onClick={onButtonClickHandle}
        >
          Додати товар
        </Button>
      )}
      <DropDown
        showLeftIconButton
        showRightIconButton
        show={buttonClicked}
        closeDropDown={() => setButtonClicked(false)}
      >
        {buttonClicked && <Input 
        variant="search" 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        autoFocus
        />}
        <div className={s.products_list}>
          {dataProducts?.map((product) => (
            <ProductDropDownItem
              key={product.id}
              product={product}
              addProduct={addProduct}
              removeProduct={removeProduct}
              updateProduct={updateProduct}
              addedProductsIds={addedProductsIds}
            />
          ))}
        </div>
        <div className={s.buttons_container}>
          <div>
            <Button
              variant="default"
              color="secondary"
              style={{ backgroundColor: "white", color: "#7A869A" }}
              onClick={cancel}
            >
              Відміна
            </Button>
          </div>
          <div>
            {" "}
            <Button
              variant="default"
              color="secondary"
              disabled={!products.length}
              onClick={toConfirm}
            >
              Підтвердити
            </Button>
          </div>
        </div>
      </DropDown>
    </div>
  );
};

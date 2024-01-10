import { Button } from "../../shared/ui/Button/Button";
import { DropDown } from "../../shared/ui/DropDown/DropDown";
import { ProductDropDownItem } from "../productDropDownItem/ProductDropDownItem";
import s from "./AddProductsDropDown.module.scss";
import { Input } from "../../shared/ui/Input/Input";
import { ProductsList } from "../productsList/ProductsList";
import { TProduct } from "../../../interfaces/products/products.type";
import { SetStateAction } from "react";

type AddProductsDropDownProps = {
  addProduct: (product: TProduct) => void;
  removeProduct: (product: TProduct) => void;
  removeCheckProduct: (id: number) => void;
  updateProduct: (product: TProduct) => void;
  cancel: () => void;
  toConfirm: () => void;
  handleProductClick: (product: TProduct) => void;
  setButtonClicked: (b: SetStateAction<boolean>) => void;
  setSearch: (search: string) => void;
  selectedProduct: TProduct | null;
  search: string;
  addedProductsIds: number[];
  dataProducts: TProduct[] | undefined;
  buttonClicked: boolean;
  products: TProduct[];
};
export const AddProductsDropDown: React.FC<AddProductsDropDownProps> = ({
  addProduct,
  removeProduct,
  removeCheckProduct,
  updateProduct,
  cancel,
  toConfirm,
  handleProductClick,
  setButtonClicked,
  setSearch,
  selectedProduct,
  search,
  addedProductsIds,
  dataProducts,
  buttonClicked,
  products,
}) => {
  return (
    <div className={s.add_products_container}>
 {buttonClicked && <div className={s.overlay_active} />}
      <div className={s.content_wrapper}>
      <ProductsList
        products={products}
        removeProduct={removeProduct}
        updateProduct={updateProduct}
        isActiveDropDown={buttonClicked}
        openDropDown={() => setButtonClicked((prev) => !prev)}
        onProductClick={handleProductClick}
      />
      {!buttonClicked && !products.length && (
        <Button
          variant="addLarge"
          color="hover"
          rightElement
          withFull
          onClick={() => setButtonClicked((prev) => !prev)}
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
        {selectedProduct && (
          <ProductDropDownItem
            product={selectedProduct}
            updateProduct={updateProduct}
            addedProductsIds={[selectedProduct.id]}
          />
        )}
        {buttonClicked && !selectedProduct && (
          <Input
            variant="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        )}
        <div className={s.products_list}>
          {!selectedProduct &&
            dataProducts?.map((product) => (
              <ProductDropDownItem
                key={product.id}
                product={product}
                addProduct={addProduct}
                removeCheckProduct={removeCheckProduct}
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
              Скасувати все
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
    </div>
  );
};
import { Button } from "../../shared/ui/Buttons/Button/Button";
import { DropDown } from "../../shared/ui/DropDown/DropDown";
import { ProductDropDownItem } from "../productDropDownItem/ProductDropDownItem";
import s from "./AddProductsDropDown.module.scss";
import { Input } from "../../shared/ui/Input/Input";
import { ProductsList } from "../productsList/ProductsList";
import { useProductManagment } from "hooks/Product/feature/useProductManagment";
import { AddSingleProductForm } from "./AddSingleProductForm/AddSingleProductForm";

type AddProductsDropDownProps = ReturnType<typeof useProductManagment>;

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
  closeForm,
  setIsAddSingleProduct,
  isAddSingleProduct,
  selectedProduct,
  search,
  addedProductsIds,
  dataProducts,
  buttonClicked,
  products,
}) => {
  return (
    <div className={s.add_products_container}>
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
          <div className={s.button_container}>
            <Button
              variant="addLarge"
              color="hover"
              rightElement
              withFull
              onClick={() => setButtonClicked((prev) => !prev)}
            >
              Додати товар
            </Button>
          </div>
        )}
        <DropDown
          showLeftIconButton
          showRightIconButton
          show={buttonClicked}
          listWidth="107%"
          closeDropDown={() => setButtonClicked(false)}
        > {!isAddSingleProduct && <div>
          {selectedProduct && (
            <ProductDropDownItem
              product={selectedProduct}
              updateProduct={updateProduct}
              addedProductsIds={[selectedProduct.id]}
            />
          )}
          {(buttonClicked && !selectedProduct && !isAddSingleProduct) && (
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
            <Button
              variant="addSmall"
              color="primary"
              leftElement
              style={{ width: "max-content" }}
              onClick={() => setIsAddSingleProduct(true)}
            >
              Разовий товар
            </Button>
            <div className={s.buttons_primary}>
              <Button
                variant="default"
                color="secondary"
                style={{ backgroundColor: "white", color: "#7A869A" }}
                onClick={cancel}
              >
                Скасувати все
              </Button>
              <Button
                variant="default"
                color="primary"
                disabled={!products.length}
                onClick={toConfirm}
              >
                Підтвердити
              </Button>
            </div>
          </div>
          </div>}
          {isAddSingleProduct && <AddSingleProductForm addProduct={addProduct} closeForm={closeForm}/>}
        </DropDown>
      </div>
    </div>
  );
};

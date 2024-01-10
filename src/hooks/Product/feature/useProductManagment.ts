import { useState } from "react";
import { TProduct } from "../../../interfaces/products/products.type";
import { useDebounce } from "../../../utils/useDebounce";
import { useGetProductsToOrder } from "../useGetProductToOrder";

export const useProductManagment = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [addedProductsIds, setAddedProductsIds] = useState<number[]>([]);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);

  const { data: dataProducts } = useGetProductsToOrder(debouncedSearch);

  const addProduct = (product: TProduct) => {
    setProducts((prevProduct) => [
      ...prevProduct,
      { ...product, indexId: prevProduct.length + 1 },
    ]);

    setAddedProductsIds((prevIds) => [...prevIds, product.id]);
  };
  const removeProduct = (removedProduct: TProduct) => {
    const updatedProducts = products.filter(
      (product) => product.indexId !== removedProduct.indexId
    );
    const updatedIds = addedProductsIds.filter(
      (id) => id !== removedProduct.id
    );
    setProducts(updatedProducts);
    setAddedProductsIds(updatedIds);
  };

  const removeCheckProduct = (productId: number) => {
    const lastIndex = products
      .concat()
      .reverse()
      .findIndex((product: TProduct) => product.id === productId);
    if (lastIndex !== -1) {
      const actualIndex = products.length - 1 - lastIndex;
      const updatedProducts = [
        ...products.slice(0, actualIndex),
        ...products.slice(actualIndex + 1),
      ];
      const updatedIds = addedProductsIds.filter((id) => id !== productId);
      setProducts(updatedProducts);
      setAddedProductsIds(updatedIds);
    }
  };

  const updateProduct = (updatedProduct: TProduct) => {
    const lastIndex = products
      .concat()
      .reverse()
      .findIndex((product: TProduct) => product.id === updatedProduct.id);
    if (lastIndex !== -1) {
      const actualIndex = products.length - 1 - lastIndex;
      const currentProduct = products[actualIndex];
      updatedProduct.indexId = currentProduct.indexId;
      const updatedProducts = [...products];
      updatedProducts[actualIndex] = updatedProduct;
      setProducts(updatedProducts);
    }
  };

  const cancel = () => {
    setAddedProductsIds([]);
    setProducts([]);
    setSelectedProduct(null);
    setSearch("");
    setButtonClicked(false);
  };

  const toConfirm = () => {
    setAddedProductsIds([]);
    setSearch("");
    setSelectedProduct(null);
    setButtonClicked(false);
  };

  const handleProductClick = (product: TProduct) => {
    setSelectedProduct(product);
    setButtonClicked(true);
  };

  return {
    addProduct,
    removeProduct,
    removeCheckProduct,
    updateProduct,
    cancel,
    toConfirm,
    handleProductClick,
    setButtonClicked,
    dataProducts,
    products,
    buttonClicked,
    setSearch,
    selectedProduct,
    search,
    addedProductsIds
  };
};

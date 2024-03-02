import { useState, MouseEventHandler } from "react";
import { TProduct } from "../../../interfaces/products/products.type";
import { useDebounce } from "../../../utils/useDebounce";
import { useGetProductsToOrder } from "../useGetProductToOrder";
import { useKeyPress } from "utils/useKeyPress";

export const useProductManagment = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [addedProductsIds, setAddedProductsIds] = useState<number[]>([]);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [newProduct, setNewProduct] = useState<TProduct | null>(null);
  

  const { data: dataProducts } = useGetProductsToOrder(debouncedSearch);

  const addProduct = (product: TProduct) => {
    setProducts((prevProduct) => [
      ...prevProduct,
      { ...product, indexId: prevProduct.length + 1 },
    ]);
    setNewProduct(product);
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
    setNewProduct(removedProduct)
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
    setNewProduct(() => {
      
      const product = products.find(product => product.id === productId);
      return product || null
      })

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
    setNewProduct(updatedProduct)

  };

  const cancel = () => {
    setAddedProductsIds([]);
    setProducts([]);
    setSelectedProduct(null);
    setSearch("");
    setButtonClicked(false);
    setNewProduct(null)
  };

  const toConfirm = () => {
    setAddedProductsIds([]);
    setSearch("");
    setSelectedProduct(null);
    setButtonClicked(false);
    setNewProduct(null)

  };

  const handleProductClick = (product: TProduct) => {
    setSelectedProduct(product);
    setButtonClicked(true);
    setNewProduct(null)

  };

  useKeyPress('Escape', () => setButtonClicked(false));
  useKeyPress('Enter', toConfirm);
  useKeyPress('Space', () => setButtonClicked(true));
 

  const totalPrice = products.reduce((total, product) => {
    const productTotal = product.price * (product.quantity || 1); 
    return total + productTotal;
  }, 0);  

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
    addedProductsIds,
    totalPrice,
    newProduct
  };
};

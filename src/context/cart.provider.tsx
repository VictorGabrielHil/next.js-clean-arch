import { Children, createContext, PropsWithChildren, use, useCallback, useEffect, useMemo, useState } from "react";
import { Product } from "../models/models";

export type CartContextType = {
  products: Product[];  
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  clear: () => void;
  total: number;
}
const defaultContext: CartContextType = {
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
  clear: () => {},
  total: 0
}

export const CartContext = createContext(defaultContext);

export const CartProvider = ({ children  }: PropsWithChildren) => {
  const [products, setProducts] = useState<Product[] | null >(null);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  useEffect(() => {
    if(!products){
      return;
    }
    localStorage.setItem('cart', JSON.stringify(products));
  }, [products]);

  const addProduct = useCallback(( product: Product) => {
    setProducts((products) => [...products!, product]);
  }, []);

  const removeProduct = (product: Product) => {
    setProducts(((products) => products!.filter((p) => p.id !== product.id)));
  }
  const clear = () => {
    setProducts([]);
  }
  const total = useMemo(() => {
    if(!products){
      return 0;
    } 
     return products.reduce((total, product) => total + product.price, 0)
    }, 
     [products]);

  return (
    <CartContext.Provider 
    value={
      {products: products || [], 
       addProduct,
       removeProduct, 
       clear, 
       total,
       }
       }
       >
      {children}
    </CartContext.Provider>
  )
}
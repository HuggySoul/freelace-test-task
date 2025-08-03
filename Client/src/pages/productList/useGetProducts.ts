import { useState, useEffect } from "react";
import { GetProducts } from "../../shared/api";
import type { Product } from "../../shared/types";

/** хук для получения всех позиций */
export const useGetProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetProducts().then((products) => {
      setProducts(products);
      setIsLoading(false);
    });
  }, []);

  return { products, isLoading, setProducts };
};

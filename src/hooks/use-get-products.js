import React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { getProducts } from "api/get-products";
export const useGetProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState();
  const token = localStorage.getItem("token");
  const history = useHistory();
  console.log(products);

  const getData = useCallback(() => {
    if (!token) {
      return;
    }

    getProducts(token)
      .then((products) => {
        console.log(products);
        setProducts(products);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 403 || !err.response.status) {
          history.push("/auth/signin");
        }
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [getData]);

  return { products, isLoading };
};

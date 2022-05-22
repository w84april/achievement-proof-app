import React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getUserInfo } from "api/get-user-info";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "state";
import { getItems } from "api/get-items";
export const useGetItems = (isApproved, search, result, sort) => {
  const [user, setUser] = useRecoilState(userState);
  const { role } = user;
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState();
  const token = localStorage.getItem("token");
  const history = useHistory();
  const getData = useCallback(() => {
    if (!token) {
      return;
    }

    const resultValue = result === "3" ? null : result;
    const approved =
      isApproved === "1" ? true : isApproved === "2" ? false : null;
    const sortString = sort ? "DESC" : "ASC";
    getItems(token, approved, search, resultValue, sortString, role)
      .then((items) => {
        setItems(items);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 403) {
          history.push("/auth/signin");
        }
      });
  }, [isApproved, search, sort, result]);

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [getData]);

  return { items, isLoading };
};

import React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getUserInfo } from "api/get-user-info";
import { useHistory } from "react-router-dom";
export const useGetUser = (userId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const token = localStorage.getItem("token");
  const history = useHistory();
  const getData = useCallback(() => {
    if (!userId || !token) {
      return;
    }
    getUserInfo(userId, token)
      .then((user) => {
        setUserInfo(user);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          history.push("/auth/signin");
        }
      });
  }, [userId]);

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [getData]);

  return { userInfo, isLoading };
};

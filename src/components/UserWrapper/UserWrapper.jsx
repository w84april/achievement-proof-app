import React, { useEffect } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";

export const UserWrapper = ({ children }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const location = useLocation();

  useEffect(() => {
    if (
      !localStorage.getItem("token") &&
      pathname !== "/auth/signin" &&
      pathname !== "/auth/signup"
    ) {
      history.push("/auth/signin");
    }
  });
  return children;
};

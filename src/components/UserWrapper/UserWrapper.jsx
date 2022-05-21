import React, { useEffect } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../state/index";
export const UserWrapper = ({ children }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [user] = useRecoilState(userState);
  console.log(localStorage.getItem("token"));
  useEffect(() => {
    if (
      (!localStorage.getItem("token") || !user) &&
      pathname !== "/auth/signin" &&
      pathname !== "/auth/signup"
    ) {
      history.push("/auth/signin");
    }
  });
  return children;
};

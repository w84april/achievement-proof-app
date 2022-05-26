import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { UserWrapper } from "./components/UserWrapper/UserWrapper";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <HashRouter>
    <RecoilRoot>
      <UserWrapper>
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <Route path={`/admin`} component={AdminLayout} />
          <Redirect from={`/`} to="/admin/dashboard" />
        </Switch>
      </UserWrapper>
    </RecoilRoot>
  </HashRouter>,
  document.getElementById("root")
);

import React from "react";
import { Switch, Route } from "react-router-dom";

import LoginView from "./Components/LoginView/LoginView";
import ProtectedTicketRoute from "./Components/PrivateRoutes/ProtectedTicketRoute";
import AuthenticatedRoutes from "./Components/PrivateRoutes/AuthenticatedRoutes";

export default (
  <Switch>
    <Route exact path="/login" component={LoginView} />
    <AuthenticatedRoutes />
  </Switch>
);

import React from "react";
import { Switch, Route } from "react-router-dom";

import HomeView from "./Components/HomeView/HomeView";
import LoginView from "./Components/LoginView/LoginView";
import OnboardView from "./Components/OnboardView/OnboardView";
import TicketView from "./Components/TicketView/TicketView";
import Wizard1 from "./Components/Wizard1/Wizard1";
import Wizard2 from "./Components/Wizard2/Wizard2";
import Wizard3 from "./Components/Wizard3/Wizard3";
import Wizard4 from "./Components/Wizard4/Wizard4";
import ProtectedTicketRoute from "./Components/PrivateRoutes/ProtectedTicketRoute";
import AuthenticatedRoutes from "./Components/PrivateRoutes/AuthenticatedRoutes";

export default (
  <Switch>
    <Route exact path="/login" component={LoginView} />
    <AuthenticatedRoutes />
  </Switch>
);

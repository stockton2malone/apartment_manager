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
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

export default (
  <Switch>
    <Route exact path="/tickets" component={HomeView} />
    <Route exact path="/" component={LoginView} />
    <Route path="/onboard" component={OnboardView} />
    <PrivateRoute path="/ticket/:id" component={TicketView} />
    <Route path="/wizard1" component={Wizard1} />
    <Route path="/wizard2" component={Wizard2} />
    <Route path="/wizard3" component={Wizard3} />
    <Route path="/wizard4" component={Wizard4} />
  </Switch>
);

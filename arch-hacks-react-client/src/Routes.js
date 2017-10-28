import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import PatientHome from "./containers/Patient/PatientHome";
import DoctorHome from "./containers/Doctor/DoctorHome";
import FourOhFour from "./containers/404";
import Register from "./containers/Register";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/patient" exact component={PatientHome} />
    <Route path="/doctor" exact component={DoctorHome} />
    <Route path="/register" exact component={Register} />
    <Route component={FourOhFour} />
  </Switch>;

import React, { Component } from "react";
import { withRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import HomeView from "../HomeView/HomeView";

class PrivateRoute extends Component {
  render() {
    let protectedComponent = props => {
      let { userRole, userID, component, tickets, path } = props;
      if (userRole && userRole === "Owner") {
        return <Route path={path} component={component} />;
      } else if (userRole && userRole === "Worker") {
        if (tickets.find(x => x.worker_id === userID)) {
          return <Route path={path} component={HomeView} />;
        }
      } else if (userRole && userRole === "Tenant") {
        if (tickets.find(x => x.created_by === userID)) {
          return <Route path={path} component={HomeView} />;
        }
      } else return <Redirect to="/" />;
    };
    return protectedComponent(this.props);
  }
}

const mapStateToProps = state => {
  const { userID, userRole, tickets } = state;
  return {
    userID,
    userRole,
    tickets
  };
};

export default withRouter(connect(mapStateToProps, {})(PrivateRoute));

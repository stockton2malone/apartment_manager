import React, { Component } from "react";
import { withRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import HomeView from "../HomeView/HomeView";

class ProtectedTicketRoute extends Component {
  render() {
    let {
      userRole,
      userID,
      component,
      tickets,
      path,
      component: Component,
      ...rest
    } = this.props;
    return (
      <Route
        render={props =>
          userRole === "Owner" ||
          (tickets.length > 0 && tickets[0].worker_id === userID) ||
          (tickets.length > 0 && tickets[0].created_by === userID) ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )}
      />
    );
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

export default withRouter(connect(mapStateToProps, {})(ProtectedTicketRoute));

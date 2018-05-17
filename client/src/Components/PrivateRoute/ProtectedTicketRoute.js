import React, { Component } from "react";
import { withRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import HomeView from "../HomeView/HomeView";

class ProtectedTicketRoute extends Component {
  render() {
    let { userRole, userID, component, tickets, path } = this.props;
    return (
      <Route
        render={({ component: Component, ...rest }) =>
          userRole === "Owner" ||
          0 === 0 ||
          (tickets.length > 0 && tickets[0].worker_id === userID) ||
          (tickets.length > 0 && tickets[0].created_by === userID) ? (
            <Component {...component} />
          ) : (
            <Redirect to="/" />
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

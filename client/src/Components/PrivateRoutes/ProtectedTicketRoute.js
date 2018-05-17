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
    //
    //
    /*We should probably be checking the server as a source of truth 
    and since data can be tampered with to pass these checks
     but for our purposes this works */
    //
    //
    return (
      <Route
        render={props =>
          userRole === "Owner" ||
          (tickets.length > 0 &&
            tickets.some(x => x.ticket_id === props.match.params.id)) ||
          (tickets.length > 0 &&
            tickets.some(x => x.ticket_id === props.match.params.id)) ? (
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

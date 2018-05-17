import React, { Component } from "react";
import { withRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class ProtectedTicketRoute extends Component {
  render() {
    let { tickets, component: Component, ...rest } = this.props;
    //
    //
    /*We should probably be checking the server as a source of truth 
    and since data can be tampered with to pass these checks
     but for our purposes this works */
    //
    //
    return (
      <Route
        {...rest}
        render={props =>
          tickets.some(x => x.ticket_id === props.match.params.id) ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )}
      />
    );
  }
}

const mapStateToProps = state => {
  const { tickets } = state;
  return {
    tickets
  };
};

export default withRouter(connect(mapStateToProps, {})(ProtectedTicketRoute));

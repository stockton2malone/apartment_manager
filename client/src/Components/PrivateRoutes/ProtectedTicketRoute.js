import React, { Component } from "react";
import { withRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class ProtectedTicketRoute extends Component {
  /* constructor() {
    super();
    this.state = {
      load: true
    }
  } */
  render() {
    let { tickets, component: Component, ...rest } = this.props;
    const id = this.props.computedMatch.params.id
    const routeID = Number(id)
    /* console.log(rest)
    console.log('this is id off of match: ', id)
    console.log(typeof Number(id))
    console.log('this is the id from tickets: ', this.props.tickets[0].ticket_id)
    console.log(typeof this.props.tickets[0].ticket_id)
    console.log(tickets.some(x => x.ticket_id === routeID))
    console.log(Component) */
    //
    //
    /*We should probably be checking the server as a source of truth 
    and since data can be tampered with to pass these checks
     but for our purposes this works */
    //
    //
   /*  if(this.state.load === true){
      return <div>ID from params is {id}</div>
    } */
    return (
      <Route
        {...rest}
        render={props =>
          tickets.some(x => x.ticket_id === routeID) ? (
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

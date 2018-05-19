import React, { Component } from "react";
import { Switch, withRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from 'axios';
import {setUserID, setUserRole} from '../../ducks/reducer';

import HomeView from "../HomeView/HomeView";
import TicketView from "../TicketView/TicketView";
import Wizard1 from "../Wizard1/Wizard1";
import Wizard2 from "../Wizard2/Wizard2";
import Wizard3 from "../Wizard3/Wizard3";
import Wizard4 from "../Wizard4/Wizard4";
import ProtectedTicketRoute from "./ProtectedTicketRoute";

class AuthenticatedRoutes extends Component {
  constructor() {
    super();
    this.state = {
      load: true
    };

  }

  componentDidMount() {
    axios.get('/api/user')
      .then(res => {
        this.props.setUserID(res.data.user_id)
        this.props.setUserRole(res.data.user_role)
        this.setState({load: false})
      })
      .catch(err => console.log(err))
  }


  render() {  
    if (this.state.load === true) {
      return <h2>Loading...</h2>
    }
    return this.props.userID ? (
      <Switch>
        <Route exact path="/dashboard" component={HomeView} />
        <ProtectedTicketRoute path="/ticket/:id" render={TicketView} />
        <Route path="/wizard1" component={Wizard1} />
        <Route path="/wizard2" component={Wizard2} />
        <Route path="/wizard3" component={Wizard3} />
        <Route path="/wizard4" component={Wizard4} />
      </Switch>
      )  : (
      <Redirect to="/" />
      )
  }
}
const mapStateToProps = state => {
  const { userID } = state;
  return {
    userID
  };
};

export default withRouter(connect(mapStateToProps, {setUserID, setUserRole})(AuthenticatedRoutes));

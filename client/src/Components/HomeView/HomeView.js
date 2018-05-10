import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TicketRow from "../TicketRow/TicketRow";
import "./HomeView.css";
import logo1 from "../../../assets/Rent (2).png";
import logo2 from "../../../assets/Rent (3).png";

import {
  setUserID,
  setUserName,
  setUserRole,
  setTickets
} from "../../ducks/reducer";

class HomeView extends Component {
  render() {
    let tickets =
      this.props.tickets.length > 0 ? (
        this.props.tickets.map((ticket, i) => (
          <div key={i}>
            <TicketRow
              ticketID={ticket.ticket_id}
              complexName={ticket.complex_id}
              unitNumber={ticket.unitNumber}
              ticketTitle={ticket.issue_description}
              ticketTime={ticket.creation_date}
            />
          </div>
        ))
      ) : (
        <div>
          <h2>NO ACTIVE TICKETS</h2>
        </div>
      );

    return (
      <div className="HomeViewContainer">
        <div className="HomeViewTitle">
          <h1>Tickets</h1>
        </div>
        <div className="infoContainer">
          <div className="ticketContainer">
            {/* {tickets}
            dummy row v */}
            <TicketRow />
            <TicketRow />
            <TicketRow />
            <TicketRow status="old" />
            <TicketRow status="assigned" />
            <TicketRow status="canceled" />
            <TicketRow status="completed" />
            <TicketRow status="old" />
            <TicketRow status="assigned" />
            <TicketRow status="canceled" />
          </div>
        </div>
        <div className="buttonDiv">
          <Link to="/wizard1">
            <div className="newTicketButton">New Ticket</div>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tickets: state.tickets
  };
};

export default withRouter(
  connect(mapStateToProps, { setUserID, setUserName, setUserRole, setTickets })(
    HomeView
  )
);

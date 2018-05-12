import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import logo1 from "../../assets/Rent (2).png";
import logo2 from "../../assets/Rent (3).png";

import TicketRow from "../TicketRow/TicketRow";
import "./HomeView.css";
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
          <img src={logo1} alt="" srcset="" />
        </div>
        <div className="infoContainer">
          <div className="ticketContainer">
            {/* {tickets}
            dummy row v */}
            <TicketRow />
            <TicketRow />
            <TicketRow />
            <TicketRow status="urgent" />
            <TicketRow status="assigned" />
            <TicketRow status="cancelled" />
            <TicketRow status="new" />
            <TicketRow status="urgent" />
            <TicketRow status="assigned" />
            <TicketRow status="cancelled" />
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

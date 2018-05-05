import React, { Component } from "react";
import TicketRow from "../TicketRow/TicketRow";
import "./HomeView.css";
import { Link } from "react-router-dom";

class HomeView extends Component {
  render() {
    let tickets = this.props.tickets ? (
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
        <div className="ticketContainer">
          {tickets}
          dummy row v
          <TicketRow />
          <Link to="/wizard1">
            <div className="newTicketButton">New Ticket</div>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomeView;

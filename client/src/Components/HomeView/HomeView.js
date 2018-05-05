import React, { Component } from "react";
import TicketRow from "../TicketRow/TicketRow";
import "./HomeView.css";

class HomeView extends Component {
  render() {
    return (
      <div className="HomeViewContainer">
        <div className="HomeViewTitle">
          <h1>Tickets</h1>
        </div>
        <div className="ticketContainer">
          <TicketRow />
          <TicketRow />
          <TicketRow />
          <TicketRow />
          <TicketRow />
          <TicketRow />
        </div>
      </div>
    );
  }
}

export default HomeView;

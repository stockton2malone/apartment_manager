import React, { Component } from "react";
import "./TicketRow.css";
class TicketRow extends Component {
  render() {
    return (
      <div className="ticketRowContainer">
        <div className="complexName">
          {this.props.complexName ? this.props.complexName : "Butler Brother's"}
        </div>
        <div className="unitNumber">
          {this.props.unitNumber ? this.props.unitNumber : "222"}
        </div>
        <div className="ticketTitle">
          {this.props.ticketTitle ? this.props.ticketTitle : "Broken Washer"}
        </div>
        <div id="ticketTime">
          {this.props.ticketTime ? this.props.ticketTime : "MON: 3pm"}
        </div>
      </div>
    );
  }
}

export default TicketRow;

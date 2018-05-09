import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./TicketRow.css";
class TicketRow extends Component {
  render() {
    let styles = status => {
      let styled;
      if (this.props.status === "old") {
        styled = {
          backgroundColor: "#F99AB5"
        };
      }
      if (this.props.status === "assigned") {
        styled = {
          backgroundColor: "#F9C49A"
        };
      }
      if (this.props.status === "canceled") {
        styled = {
          backgroundColor: "#F9F69A"
        };
      }
      if (this.props.status === "completed") {
        styled = {
          backgroundColor: "#9AF9F1"
        };
      }
      return styled;
    };
    return (
      <Link to={`/ticket/${this.props.ticketID}`}>
        {" "}
        <div className="ticketRowContainer">
          <div className="complexName">
            {this.props.complexName
              ? this.props.complexName
              : "Butler Brother's"}
          </div>
          <div className="unitNumber">
            {this.props.unitNumber ? this.props.unitNumber : "222"}
          </div>
          <div className="ticketTitle">
            {this.props.ticketTitle ? this.props.ticketTitle : "Broken Washer"}
          </div>
          <div id="ticketTime" style={styles(this.props.status)}>
            {this.props.ticketTime ? this.props.ticketTime : "MON: 3pm"}
          </div>
        </div>
      </Link>
    );
  }
}

export default TicketRow;

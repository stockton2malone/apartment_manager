import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./TicketRow.css";
class TicketRow extends Component {
  render() {
    let styles = status => {
      let styled;
      if (this.props.status === "urgent") {
        styled = {
          backgroundColor: "#F99AB5"
        };
      }
      if (this.props.status === "cancelled") {
        styled = {
          backgroundColor: "#F9C49A"
        };
      }
      if (this.props.status === "new") {
        styled = {
          backgroundColor: "#F9F69A"
        };
      }
      if (this.props.status === "assigned") {
        styled = {
          backgroundColor: "#9AF9F1"
        };
      }
      return styled;
    };
    return (
      <Link to={`/ticket/${this.props.ticketID}`}>
        {this.props.userRole === "Tenant" ? (
          <div className="ticketRowContainer">
            <div className="ticketAssignee">
              {this.props.worker_id ? this.props.worker_id : "Not Yet Assigned"}
            </div>
            <div className="ticketStatus">
              {this.props.status ? this.props.status : "Completed"}
            </div>
            <div className="ticketTitle">
              {this.props.ticketTitle
                ? this.props.ticketTitle
                : "Broken Washer"}
            </div>
            <div id="ticketTime" style={styles(this.props.status)}>
              {this.props.ticketTime ? this.props.ticketTime : "MON: 3pm"}
            </div>
          </div>
        ) : (
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
              {this.props.ticketTitle
                ? this.props.ticketTitle
                : "Broken Washer"}
            </div>
            <div id="ticketTime" style={styles(this.props.status)}>
              {this.props.ticketTime ? this.props.ticketTime : "MON: 3pm"}
            </div>
          </div>
        )}
      </Link>
    );
  }
}

export default TicketRow;

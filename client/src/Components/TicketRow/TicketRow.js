import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./TicketRow.css";
class TicketRow extends Component {
  render() {
    let styles = status => {
      let styled;
      if (this.props.status === "New") {
        styled = {
          //pink
          backgroundColor: "#F99AB5"
        };
      }
      if (this.props.status === "Canceled") {
        styled = {
          //orange
          backgroundColor: "#F9C49A"
        };
      }
      if (this.props.status === "Assigned") {
        styled = {
          //yellow
          backgroundColor: "#F9F69A"
        };
      }
      if (this.props.status === "In Process") {
        styled = {
          //teal
          backgroundColor: "#9AF9F1"
        };
      }
      return styled;
    };
    return (
      <Link to={`/ticket/${this.props.ticketID}`}>
        {this.props.userRole === "Tenant" ? (
          <tr className="ticketData">
            <td className="ticketData">
              {this.props.worker_id
                ? `Worker#: ${this.props.worker_id}`
                : "Not Yet Assigned"}
            </td>
            <td className="ticketData">
              {this.props.status ? this.props.status : "Completed"}
            </td>
            <td className="ticketData">
              {this.props.ticketTitle ? this.props.ticketTitle : "-"}
            </td>
            <td id="ticketTime" style={styles(this.props.status)}>
              {this.props.ticketTime ? this.props.ticketTime.slice(5, 10) : "-"}
            </td>
          </tr>
        ) : (
          <tr className="ticketRowContainer">
            <td className="ticketData">
              {this.props.complexName ? this.props.complexName : "-"}
            </td>
            <td className="ticketData">
              {this.props.unitNumber ? this.props.unitNumber : "-"}
            </td>
            <td className="ticketData">
              {this.props.ticketTitle ? this.props.ticketTitle : " -"}
            </td>
            <td id="ticketTime" style={styles(this.props.status)}>
              {this.props.ticketTime ? this.props.ticketTime.slice(5, 10) : "-"}
            </td>
          </tr>
        )}
      </Link>
    );
  }
}

export default TicketRow;

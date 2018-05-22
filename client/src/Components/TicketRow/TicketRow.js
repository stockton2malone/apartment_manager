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
          <tr className="ticketRowContainer">
            <td className="ticketAssignee">
              {this.props.worker_id ? this.props.worker_id : "Not Yet Assigned"}
            </td>
            <td className="ticketStatus">
              {this.props.status ? this.props.status : "Completed"}
            </td>
            <td className="ticketTitle">
              {this.props.ticketTitle
                ? this.props.ticketTitle
                : " askjdhf jklahsdf ljkahsd asdkjf halksdfh ljkashf  asd fjhaskjldf h"}
            </td>
            <td id="ticketTime" style={styles(this.props.status)}>
              {this.props.ticketTime
                ? this.props.ticketTime.slice(5, 10)
                : "MON: 3pm"}
            </td>
          </tr>
        ) : (
          <tr className="ticketRowContainer">
            <td className="complexName">
              {this.props.complexName
                ? this.props.complexName
                : "Butler Brother's more more more more"}
            </td>
            <td className="unitNumber">
              {this.props.unitNumber
                ? this.props.unitNumber
                : "222 more more more more"}
            </td>
            <td className="ticketTitle">
              {this.props.ticketTitle
                ? this.props.ticketTitle
                : " sdfg jsk sdlfg j;klsdj ojsf;glk jsdl gj Washer"}
            </td>
            <td id="ticketTime" style={styles(this.props.status)}>
              {this.props.ticketTime
                ? this.props.ticketTime.slice(5, 10)
                : "MON: 3pm more more more more "}
            </td>
          </tr>
        )}
      </Link>
    );
  }
}

export default TicketRow;

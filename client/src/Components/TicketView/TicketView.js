import React, { Component } from "react";
import "./TicketView.css";
class TicketView extends Component {
  render() {
    return (
      <div className="ticketViewContainer">
        <h1>
          {this.props.ticketNumber ? this.props.ticketNumber : " Ticket #1"}
        </h1>
        <h2>{`Assigned:${this.props.assignee
          ? this.props.assignee
          : " Unassigned"}`}</h2>
        <div className="ticketInfoContainer">
          <div className="dateAssigned">
            <h3>Assigned On:</h3>
            {`${this.props.assignedDate
              ? this.props.assignedDate
              : " Unassigned"}`}
          </div>

          <div className="ticketDescription">
            <h3>Description:</h3>
            {`${this.props.description ? this.props.description : "lorem"}`}
          </div>
          <div className="urgencyType">
            <div>
              <h3>Urgency:</h3>
              {`${this.props.urgency ? this.props.urgency : "Critical"}`}
            </div>
            <div>
              <h3>Type:</h3>
              {`${this.props.type ? this.props.type : "New"}`}
            </div>
          </div>
          <div className="noteContainer">
            <div>first note</div>
            <div onClick={() => alert("get the ducks going")}>+ Add Note</div>
          </div>
          <h3>Ticket Status</h3>
          {this.props.userRole === "tenant" ? (
            <div className="ticketStatus">
              {this.props.ticketStatus
                ? this.props.ticketStatus
                : "Placeholder"}
            </div>
          ) : (
            <select name="ticketStatus" id="statusSelect">
              <option value="New">New</option>
              <option value="Assigned">Assigned</option>
              <option value="In Process">In Process</option>
              <option value="Canceled">Canceled</option>
              <option value="Completed">Completed</option>
            </select>
          )}
        </div>
      </div>
    );
  }
}

export default TicketView;

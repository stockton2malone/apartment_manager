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
          <div className="dateAssigned inlay">
            <span className='lrg'>Assigned On:</span>
            {`${this.props.assignedDate
              ? this.props.assignedDate
              : new Date().toLocaleString()}`}
          </div>
          <div className="dateCompleted inlay">
            <span className='lrg'>Completed On:</span>
            {`${this.props.completedDate
              ? this.props.completedDate
              : "N/A"}`}
          </div>

          <div className="ticketDescription inlay">
            <span className='lrg'>Description:</span>
            {`${this.props.description ? this.props.description : "lorem ipsum yall"}`}
          </div>
          <div className="inlay">
            <div>
              <span className='lrg'>Urgency:</span>
              <span className={this.props.urgency ? this.props.urgency : "critical"}>{`${this.props.urgency ? this.props.urgency : "Critical"}`}</span>
            </div>
            
          </div>
          <div className="inlay"><div>
              <span className='lrg'>Type:</span>
              {`${this.props.type ? this.props.type : "New"}`}</div>
            </div>
          <div className="noteContainer inlay">
            <div className='existing-note'>
              <div className="attachment"><i className="fas fa-paperclip"></i></div>
              <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed nisl neque. Nulla nec tortor eget dolor vulputate tincidunt. Vestibulum quis dignissim nulla. Integer ullamcorper porta lectus. Suspendisse fermentum at nisi id semper. Etiam dictum varius aliquet. Curabitur maximus porttitor maximus. Nulla vehicula vitae tortor ac pretium. Cras mi mi, malesuada eu urna eu, pharetra efficitur dolor.
              </div>
            </div>
            <div className='existing-note'>
              <div className="attachment"><i className="fas fa-paperclip"></i></div>
              <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed nisl neque. Nulla nec tortor eget dolor vulputate tincidunt. Vestibulum quis dignissim nulla. Integer ullamcorper porta lectus. Suspendisse fermentum at nisi id semper. Etiam dictum varius aliquet. Curabitur maximus porttitor maximus. Nulla vehicula vitae tortor ac pretium. Cras mi mi, malesuada eu urna eu, pharetra efficitur dolor.
              </div>
            </div>
            <div className="inlay" onClick={() => alert("get the ducks going")}>+ Add Note</div>
          </div>
          <div className="inlay">
          <span className="lrg">Ticket Status</span>
          {this.props.userRole === "tenant" ? (
            <div className="ticketStatus inlay">
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
      </div>
    );
  }
}

export default TicketView;

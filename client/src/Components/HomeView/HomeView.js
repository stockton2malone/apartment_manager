import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import logo1 from "../../assets/Rent (2).png";
import logo2 from "../../assets/Rent (3).png";

import TicketRow from "../TicketRow/TicketRow";
import "./HomeView.css";
import { setTickets } from "../../ducks/reducer";

class HomeView extends Component {
  componentDidMount() {
    //console.log("userID: ", this.props.userID)
    //console.log('userRole: ', this.props.userRole)
    if (this.props.userRole === "Owner") {
      axios
        .get(`/api/tickets/owner/${this.props.userID}`)
        .then(res => {
          this.props.setTickets(res.data);
        })
        .catch(err => console.log(err));
    } else if (this.props.userRole === "Worker") {
      axios
        .get(`/api/tickets/worker/${this.props.userID}`)
        .then(res => {
          this.props.setTickets(res.data);
        })
        .catch(err => console.log(err));
    } else if (this.props.userRole === "Tenant") {
      axios
        .get(`/api/tickets/tenant/${this.props.userID}`)
        .then(res => {
          this.props.setTickets(res.data);
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    let tickets =
      this.props.tickets.length > 0 ? (
        this.props.tickets.map((ticket, i) => (
          <TicketRow
            key={i}
            ticketID={ticket.ticket_id}
            complexName={ticket.complex_id}
            unitNumber={ticket.unitNumber}
            ticketTitle={ticket.issue_description}
            ticketTime={ticket.creation_date}
            status={ticket.ticket_status}
          />
        ))
      ) : (
        <div>
          <h2>NO ACTIVE TICKETS</h2>
        </div>
      );
    console.log(this.props.tickets);
    return (
      <div className="HomeViewContainer">
        <div className="HomeViewTitle">
          <img className="homeViewImg" src={logo1} alt="" srcset="" />
        </div>
        <div className="infoContainer">
          <div className="ticketContainer">
            <table className="ticketTable">
              <tbody className="ticketTableBody">{tickets}</tbody>
            </table>
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
  const { tickets, userID, userRole } = state;
  return {
    tickets,
    userID,
    userRole
  };
};

export default withRouter(connect(mapStateToProps, { setTickets })(HomeView));

import React, { Component } from "react";
import axios from 'axios';
import {connect} from 'react-redux';

import "./TicketView.css";

import {setNotes, setTickets} from '../../ducks/reducer';

class TicketView extends Component {

  constructor(){
    super();
    this.isEditing = false;
  }

  componentDidMount(){
    let id = window.location.hash.split("\/").pop()
    console.log(id)

    axios.get(`http://localhost:3001/api/ticket/${id}/notes`)
    .then(notes => {
      if (notes.data.length){
        this.props.setNotes(notes.data)
      }
      else{
        console.warn("No Notes Found!!")
      }
    })

  }

  getAttachment(e){
    if (e.target.classList.contains("fas")) e.target = e.target.parentElement;
    let {dataset} = e.target;
    let attachmentID = dataset.attachmentId;
    let noteID = dataset.noteId

    let noteContainer = e.target.parentElement;
    let height = noteContainer.offsetHeight * 2;
    let width = noteContainer.offsetWidth - 20;

    axios.get(`http://localhost:3001/api/image?id=${attachmentID}&height=${height}&width=${width}`)
    .then(imageElem => {
      let note = this.props.notes.filter( n => n.notes_id == noteID)[0];
      note.attachment = imageElem.data;
      let allNotes = this.props.notes.filter(n => n.notes_id != noteID).concat(note)
      this.props.setNotes(allNotes)
    })
    .catch(e => console.error(e))
  }

  startEditing(){
  }

  stopEditing(){
  }

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
          {
            
            this.props.notes.sort((a,b) => new Date(a.created_time) - new Date(b.created_time)).map( (note, i) => {
              return(<div key={i} className='existing-note'>
              <div className={note.notes_attachement_id ? 'attachment' : 'attachment hidden'} data-note-id={note.notes_id} data-attachment-id={note.notes_attachement_id} onClick={(e)=>this.getAttachment(e)}>
                <i className="fas fa-paperclip"></i>
              </div>
              <div>
                <span className='lrg'>{new Date(note.created_time).toDateString()}</span><hr />
                {note.notes_description}
                </div>
                <div className={note.attachment ? 'thumbnail' : 'thumbnail hidden'} dangerouslySetInnerHTML={{ __html: note.attachment }}>
                  
                </div>
            </div>)
            })

          }
            <div className="inlay" onClick={() => this.startEditing()}>+ Add Note</div>
            
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

let mapStateToProps = state => {
  const {notes, tickets} = state;
  return {
    notes,
    tickets
  }
};

export default connect(mapStateToProps, {setNotes, setTickets})(TicketView);

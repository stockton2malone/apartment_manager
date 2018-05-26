import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import "./TicketView.css";

import { setNotes, setTickets, setWorkerId, setTicketStatus } from '../../ducks/reducer';

class TicketView extends Component {

  constructor() {
    super()
    this.addNote = false;


    this.user = {};
  }

  componentDidMount() {
    this.getTicketData()
    
  }

  getTicketData(){
    let id = window.location.hash.split("/").pop();
    axios.get(`http://localhost:3001/api/ticket/${id}`)
    .then( resp => {
      if (resp.data.length){
        this.props.setTickets(resp.data)
        this.props.setWorkerId(resp.data[0].worker_id)
        this.props.setTicketStatus(resp.data[0].ticket_status)
        //console.log(resp.data)
        axios.get(`http://localhost:3001/api/users/${resp.data[0].created_by_id}`)
        .then(r => {
          // console.log(r)
          if (r.data){
            // console.log("USER",r.data)
            this.user = r.data;
            this.getAllNotes()
          } 
        })
      }
    })
  }

  getAllNotes() {
    let id = window.location.hash.split("/").pop();
    axios.get(`http://localhost:3001/api/ticket/${id}/notes`)
      .then(notes => {
        if (notes.data.length) {
          var promises = [];
          notes.data.forEach(note => {
            let promise = axios.get(`http://localhost:3001/api/users/${note.created_by}`)
            promises.push(promise)
          })
          axios.all(promises).then((users) => {

            this.uploadNoteSpinner(false);

            users.forEach(user => {
              var noteIndex = notes.data.findIndex(n => n.created_by == user.data.user_id && !n.created_by_name);
              notes.data[noteIndex].created_by_name = user.data.user_name
            })

            this.props.setNotes(notes.data)
          })

        }
        else {
          console.warn("No Notes Found!!")
          this.props.setNotes([])
        }
      })
  }

  noteMetadata(e) {
    if (e.target.classList.contains("fas")) e.target = e.target.parentElement;
    let { dataset } = e.target;
    let attachmentID = dataset.attachmentId;
    let noteID = dataset.noteId;
    let note = this.props.notes.filter(n => n.notes_id == noteID)[0];
    return { attachmentID, noteID, note }
  }


  alterNotesState(noteID, field, value) {
    let note = this.props.notes.filter(n => n.notes_id == noteID)[0];
    note[field] = value;
    let allNotes = this.props.notes.filter(n => n.notes_id != noteID).concat(note)
    this.props.setNotes(allNotes)
  }

  getAttachment(e) {
    let { attachmentID, noteID, note } = this.noteMetadata(e);

    if (!note.attachment) { // dont let it keep fetching the attachment if it already has it

      let noteContainer = e.target.parentElement;
      let dimension = noteContainer.offsetWidth - 20;


      axios.get(`http://localhost:3001/api/image?id=${attachmentID}&height=${dimension}&width=${dimension}`)
        .then(imageElem => {
          this.alterNotesState(noteID, "attachment", imageElem.data)
        })
        .catch(e => console.error(e))
    }
  }

  deleteNote(e) {
    let confirmation = window.confirm("This will delete the selected note! There is no going back!")
    if (confirmation) {
      let ticketID = window.location.hash.split("/").pop()
      let { noteID } = this.noteMetadata(e);
      axios.delete(`http://localhost:3001/api/ticket/${ticketID}/notes/${noteID}`)
        .then(resp => {
          this.getAllNotes();
        })
    }
  }

  editNote(e) {
    let { noteID, note } = this.noteMetadata(e);
    if (note.isEditing) {
      this.stopEditing(noteID)
    }
    else {
      this.startEditing(noteID, note)
    }
  }

  startEditing(noteID, note) {
    this.alterNotesState(noteID, "isEditing", true)
  }

  stopEditing(noteID) {
    let ticketID = window.location.hash.split("/").pop();
    let editor = document.getElementById('editor');
    if (editor.dataset.noteId == noteID) {
      var description = editor.value;
      axios.patch(`http://localhost:3001/api/ticket/${ticketID}/notes/${noteID}`, { description })
        .then(resp => {
          this.getAllNotes()
        })
    }
    else {
      console.error("INVALID")
    }
  }

  openNewNoteForm() {
    this.addNote = true;
    this.getAllNotes() //checks notes and refreshes renderer
  }

  closeNewNoteForm() {
    this.addNote = false;
    this.getAllNotes() //checks notes and refreshes renderer
  }

  uploadNoteSpinner(spin) {

    try{
    document.getElementById("newNoteDesc").disabled = spin;
    document.getElementById("newNoteAttachment").disabled = spin;
    document.getElementById("newNoteSubmit").disabled = spin;
    document.getElementById("newNoteCancel").disabled = spin;
    if (spin) document.getElementById("loader").classList.remove("hidden")
    else document.getElementById("loader").classList.add("hidden")

    }
    catch(e){
      //do nothing for now
    }
  }

  saveNewNote() {
    let ticketID = window.location.hash.split("/").pop();
    let description = document.getElementById("newNoteDesc").value;
    let file = document.getElementById("newNoteAttachment").files.length ? document.getElementById("newNoteAttachment").files[0] : null;

    // ONLY FOR DEV! THERES NO AUTH ON THE APP RIGHT NOW SO MANUALLY SUPPLYING A USER ID! //
    let id = this.props.userID;
    ////////////////////////

    if (file) {
      var reader = new FileReader();
      reader.onloadend = () => {
        file = reader.result;
        if (description) {
          this.uploadNoteSpinner(true);
          axios.post(`http://localhost:3001/api/ticket/${ticketID}/notes`, { description, file, id })
            .then(resp => {

              // console.log(resp)
              this.addNote = false;
              this.getAllNotes()
            })
            .catch(e => {
              console.error(e);
              this.getAllNotes();

            })
        }
        else {
          alert("No Description Found!")
        }
      }
      reader.readAsDataURL(file);
    }
    else {
      if (description) {
        this.uploadNoteSpinner(true);
        axios.post(`http://localhost:3001/api/ticket/${ticketID}/notes`, { description, file, id })
          .then(resp => {

            // console.log(resp)
            this.addNote = false;
            this.getAllNotes();
          })
          .catch(e => console.error(e))
      }
      else {
        alert("No Description Found!")
      }
    }
  }

  updateTicketStatus(e){
    const body = {
      complex_id: this.props.tickets[0].complex_id,
      issue_type: this.props.tickets[0].issue_type,
      issue_description: this.props.tickets[0].issue_description,
      urgency_level: this.props.tickets[0].urgency_level,
      permission_enter: this.props.tickets[0].permission_enter,
      permission_notifications: this.props.tickets[0].permission_notifications,
      assigned_status: this.props.tickets[0].assigned_status,
      assigned_date: this.props.tickets[0].assigned_date,
      worker_id: this.props.worker_id,
      ticket_status: this.props.ticket_status,
      completion_date: this.props.tickets[0].completion_date,
      unit_number: this.props.tickets[0].unit_number,
      tenant_disclaimer: this.props.tickets[0].tenant_disclaimer
    }
    console.log(body)
    axios.patch(`/api/ticket/${this.props.tickets[0].ticket_id}`, body)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }

  alertTest(){
    console.log(this.props.ticket_status)
  }

  render() {
    const {setTicketStatus} = this.props;
    // console.log(this.props.tickets)
    let ticket = this.props.tickets[0];
    console.log("this is ticket.worker_id: ",ticket.worker_id)
     console.log("this.is user.user_id: ",this.user.user_id);
    if (ticket && this.user){
    return (
      <div className="ticketViewContainer">
        <h1>
          {this.props.ticketNumber ? this.props.ticketNumber : `Ticket #${window.location.hash.split("/").pop()}`}
        </h1>
        <h2>{`Assigned To: ${ticket.assigned_status
          ? ticket.worker_id
          : " Not Assigned"}`}</h2>
        <div className="ticketInfoContainer">

          <div className="dateCreated inlay">
          <div>
            <span className='lrg'>Created On:</span>
            {`${ticket.creation_date ? 
              new Date(ticket.creation_date).toLocaleString()
              : "Not Assigned"}`}
          </div></div>
          <div className="dateAssigned inlay">
          <div>
            <span className='lrg'>Assigned On:</span>
            {`${ticket.assigned_date ? 
              new Date(ticket.assigned_date).toLocaleString()
              : "Not Assigned"}`}
          </div></div>
          <div className="dateCompleted inlay">
          <div>
            <span className='lrg'>Completed On:</span>

            {`${ticket.completion_date
              ? new Date(ticket.completion_date).toLocaleString()
              : "Not Completed"}`}
              </div>
          </div>

          <div className="ticketDescription inlay">
            <div>
            <span className='lrg'>Description:</span>

            {`${ticket.issue_description ? ticket.issue_description : "No Description"}`}
            </div>
          </div>
          <div className="inlay">
            <div>
              <span className='lrg'>Urgency:</span>

              <span className={ticket.urgency_level ? ticket.urgency_level : "N/A"}>{`${ticket.urgency_level ? ticket.urgency_level : "N/A"}`}</span>
            </div>

          </div>
          <div className="inlay"><div>
            <span className='lrg'>Type:</span>

            {`${ticket.issue_type ? ticket.issue_type : "N/A"}`}</div>
          </div>
          <div className="noteContainer inlay">
            {

              this.props.notes.length ? this.props.notes.sort((a, b) => new Date(a.created_time) - new Date(b.created_time)).map((note, i) => {
                return (<div key={i} className='existing-note'>
                  <div title="Delete Note" className={note.isEditing ? 'hidden' : 'delete btn'} data-note-id={note.notes_id} data-attachment-id={note.notes_attachement_id} onClick={(e) => this.deleteNote(e)}>
                    <i className="fas fa-trash-alt"></i>
                  </div>
                  <div title="Edit Note" className='edit btn' data-note-id={note.notes_id} data-attachment-id={note.notes_attachement_id} onClick={(e) => this.editNote(e)}>
                    <i className={note.isEditing ? 'fas fa-check-square' : 'fas fa-edit'}></i>
                  </div>
                  <div title="View Attachment" className={note.notes_attachement_id ? note.isEditing ? 'attachment hidden btn' : 'attachment btn' : 'attachment hidden btn'} data-note-id={note.notes_id} data-attachment-id={note.notes_attachement_id} onClick={(e) => this.getAttachment(e)}>
                    <i className="fas fa-paperclip"></i>
                  </div>

                  <div>
                    <span className='lrg'>{note.created_by_name}</span><div>{new Date(note.created_time).toLocaleString()}</div><hr />
                    {note.isEditing ? <textarea id='editor' data-note-id={note.notes_id} defaultValue={note.notes_description}></textarea> : <span>{note.notes_description}</span>}
                  </div>
                  <div className={note.attachment ? 'thumbnail' : 'thumbnail hidden'} dangerouslySetInnerHTML={{ __html: note.attachment }}>

                  </div>
                </div>)
              }) : ''

            }
            <div id='addNote' className={this.addNote ? 'inlay' : 'hidden'}>

              <h3>New Note <i id='loader' className='fas fa-spinner fa-spin hidden'></i></h3>
              <textarea id='newNoteDesc' placeholder="Description"></textarea>
              <input id="newNoteAttachment" type="file" />
              <div>
                <button id="newNoteCancel" onClick={(e) => this.closeNewNoteForm()}>Cancel</button>
                <button id="newNoteSubmit" onClick={(e) => this.saveNewNote()}>Save</button>
              </div>
              

            </div>
            <div className="inlay btn" onClick={(e) => this.openNewNoteForm()}>+ Add Note</div>

          </div>
          <div className="inlay">
          <div>
            <span className="lrg">Ticket Status</span>

            {this.props.userID != ticket.worker_id ? (
              <div className="ticketStatus inlay">
                {ticket.ticket_status
                  ? ticket.ticket_status
                  : "Placeholder"}
              </div>
            ) : (<div>
                <select value={this.props.ticket_status}name="ticketStatus" id="statusSelect" onChange={(e) => setTicketStatus(e.target.value)}>
                  <option value="New">New</option>
                  <option value="Assigned">Assigned</option>
                  <option value="In Process">In Process</option>
                  <option value="Canceled">Canceled</option>
                  <option value="Completed">Completed</option>
                </select>
                <Link to='/'><button className="btn-right" onClick={() => this.updateTicketStatus()}>Update</button></Link></div>
              )}
          </div></div>
        </div>
      </div>
    );
  }
  else{
    return (
      <div className='loader'>
        <i className='fas fa-spinner fa-spin fa-3x'></i>  
      </div>
    )
  }
  }
}

let mapStateToProps = state => {
  const { notes, tickets, userID, worker_id, ticket_status } = state;
  return {
    notes,
    tickets,
    userID,
    worker_id,
    ticket_status
  }
};

export default connect(mapStateToProps, { setNotes, setTickets, setWorkerId, setTicketStatus })(TicketView);

import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux';

import "./TicketView.css";

import { setNotes, setTickets } from '../../ducks/reducer';

class TicketView extends Component {

  constructor() {
    super()
    this.addNote = false;
  }

  componentDidMount() {
    this.getAllNotes()
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
    document.getElementById("newNoteDesc").disabled = spin;
    document.getElementById("newNoteAttachment").disabled = spin;
    document.getElementById("newNoteSubmit").disabled = spin;
    document.getElementById("newNoteCancel").disabled = spin;
    if (spin) document.getElementById("loader").classList.remove("hidden")
    else document.getElementById("loader").classList.add("hidden")
  }

  saveNewNote() {
    let ticketID = window.location.hash.split("/").pop();
    let description = document.getElementById("newNoteDesc").value;
    let file = document.getElementById("newNoteAttachment").files.length ? document.getElementById("newNoteAttachment").files[0] : null;

    // ONLY FOR DEV! THERES NO AUTH ON THE APP RIGHT NOW SO MANUALLY SUPPLYING A USER ID! //
    let id = 'auth0|5aede71d04eb0b243f1decb6';
    ////////////////////////

    if (file) {
      var reader = new FileReader();
      reader.onloadend = () => {
        file = reader.result;
        if (description) {
          this.uploadNoteSpinner(true);
          axios.post(`http://localhost:3001/api/ticket/${ticketID}/notes`, { description, file, id })
            .then(resp => {
              console.log(resp)
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
            console.log(resp)
            this.addNote = false;
            this.getAllNotes();
          })
          .catch(e => console.log(e))
      }
      else {
        alert("No Description Found!")
      }
    }
  }

  render() {
    return (
      <div className="ticketViewContainer">
        <h1>
          {this.props.ticketNumber ? this.props.ticketNumber : `Ticket #${window.location.hash.split("/").pop()}`}
        </h1>
        <h2>{`Assigned:${this.props.assignee
          ? this.props.assignee
          : " Unassigned"}`}</h2>
        <div className="ticketInfoContainer">
          <div className="dateAssigned inlay">
          <div>
            <span className='lrg'>Assigned On:</span>
            {`${this.props.assignedDate
              ? this.props.assignedDate
              : new Date().toLocaleString()}`}
          </div></div>
          <div className="dateCompleted inlay">
          <div>
            <span className='lrg'>Completed On:</span>
            {`${this.props.completedDate
              ? this.props.completedDate
              : "N/A"}`}
              </div>
          </div>

          <div className="ticketDescription inlay">
            <div>
            <span className='lrg'>Description:</span>
            {`${this.props.description ? this.props.description : "lorem ipsum yall"}`}
            </div>
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
          </div></div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  const { notes, tickets } = state;
  return {
    notes,
    tickets
  }
};

export default connect(mapStateToProps, { setNotes, setTickets })(TicketView);

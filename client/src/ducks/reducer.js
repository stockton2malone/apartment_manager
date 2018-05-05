//initial state
const initialState = {
  //user
  userID: "",
  userName: "",
  userRole: "",
  //existing ticket
  tickets: [],
  //new ticket/wizard
  wizLevel: "",
  wizType: "",
  wizDescription: "",
  wizAttachment: "",
  wizPermission: false,
  wizTextOptIn: false,
  wizSubmitTime: "",
  //existing notes
  notes: [],
  //new note
  noteTitle: "",
  noteDescription: "",
  noteAttachment: "",
  noteSubmitTime: ""
};
//////////////////////////////////////
//constants
//user related
const SET_USER_ID = "SET_USER_ID";
const SET_USER_NAME = "SET_USER_NAME";
const SET_USER_ROLE = "SET_USER_ROLE";
//existing ticket related
const SET_TICKETS = "SET_TICKETS";
//new ticket/wizard
const SET_WIZ_LEVEL = "SET_WIZ_LEVEL";
const SET_WIZ_TYPE = "SET_WIZ_TYPE";
const SET_WIZ_DESCRIPTION = "SET_WIZ_DESCRIPTION";
const SET_WIZ_ATTACHMENT = "SET_WIZ_ATTACHMENT";
const SET_WIZ_PERMISSION = "SET_WIZ_PERMISSION";
const SET_WIZ_TEXT_OPT_IN = "SET_WIZ_TEXT_OPT_IN";
//existing notes
const SET_NOTES = "SET_NOTES";
//new notes
const SET_NOTES_TITLE = "SET_NOTES_TITLE";
const SET_NOTES_DESCRIPTION = "SET_NOTES_DESCRIPTION";
const SET_NOTES_ATTACHMENT = "SET_NOTES_ATTACHMENT";
const SET_NOTES_SUBMIT_TIME = "SET_NOTES_SUBMIT_TIME";

///////////////////////////////////////
//action creators
//user related
export function setUserID(id) {
  return {
    type: SET_USER_ID,
    payload: id
  };
}
export function setUserName(name) {
  return {
    type: SET_USER_NAME,
    payload: name
  };
}
export function setUserRole(role) {
  return {
    type: SET_USER_ROLE,
    payload: role
  };
}
//existing ticket related
export function setTickets(tickets) {
  return {
    type: SET_TICKETS,
    payload: tickets
  };
}
//new ticket/wizard
export function setWizLevel(level) {
  return {
    type: SET_WIZ_LEVEL,
    payload: level
  };
}
export function setWizType(type) {
  return {
    type: SET_WIZ_TYPE,
    payload: type
  };
}
export function setWizDesc(desc) {
  return {
    type: SET_WIZ_DESCRIPTION,
    payload: desc
  };
}
export function SET_WIZ_ATTACHMENT(att) {
  return {
    type: SET_WIZ_ATTACHMENT,
    payload: att
  };
}
export function SET_WIZ_PERMISSION(permission) {
  return {
    type: SET_WIZ_PERMISSION,
    payload: permission
  };
}
export function setTextOptIn(optIn) {
  return {
    type: SET_WIZ_TEXT_OPT_IN,
    payload: optIn
  };
}
//note related
export function setNotes(notes) {
  return {
    type: SET_NOTES,
    payload: notes
  };
}
export function setNoteTitle(title) {
  return {
    type: SET_NOTES_TITLE,
    payload: title
  };
}
export function setNoteDesc(desc) {
  return {
    type: SET_NOTES_DESCRIPTION,
    payload: desc
  };
}
export function setNoteAttachment(att) {
  return {
    type: SET_NOTES_ATTACHMENT,
    payload: att
  };
}
export function setNoteSubmitTime(time) {
  return {
    type: SET_NOTES_SUBMIT_TIME,
    payload: time
  };
}

///////////////////////////////////////
//reducer
export default function reducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    //user//////////////////
    case SET_USER_ID:
      return Object.assign({}, state, {
        userID: payload
      });
    case SET_USER_NAME:
      return Object.assign({}, state, {
        userName: payload
      });
    case SET_USER_ROLE:
      return Object.assign({}, state, {
        userRole: payload
      });
    //existing tix/////////
    case SET_TICKETS:
      return Object.assign({}, state, {
        tickets: payload
      });
    //wizard/ new tix///////
    case SET_WIZ_LEVEL:
      return Object.assign({}, state, {
        wizLevel: payload
      });
    case SET_WIZ_TYPE:
      return Object.assign({}, state, {
        wizType: payload
      });
    case SET_WIZ_DESCRIPTION:
      return Object.assign({}, state, {
        wizDescription: payload
      });
    case SET_WIZ_ATTACHMENT:
      return Object.assign({}, state, {
        wizAttachment: payload
      });
    case SET_WIZ_PERMISSION:
      return Object.assign({}, state, {
        wizPermission: payload
      });
    case SET_WIZ_TEXT_OPT_IN:
      return Object.assign({}, state, {
        wizTextOptIn: payload
      });
    //existing notes/////////
    case SET_NOTES:
      return Object.assign({}, state, {
        notes: payload
      });
    //new notes//////////////
    case SET_NOTES_TITLE:
      return Object.assign({}, state, {
        noteTitle: payload
      });
    case SET_NOTES_DESCRIPTION:
      return Object.assign({}, state, {
        noteDescription: payload
      });
    case SET_NOTES_ATTACHMENT:
      return Object.assign({}, state, {
        noteAttachment: payload
      });
    case SET_NOTES_SUBMIT_TIME:
      return Object.assign({}, state, {
        noteSubmitTime: payload
      });
    default:
      return state;
  }
}

//initial state
const initialState = {
  //user
  userID: "",
  userName: "",
  userRole: "",
  userComplex: "",
  //workers
  workers: [],
  assigned_worker: "",
  //existing ticket
  tickets: [],
  worker_id: "",
  worker_name: "",
  ticket_status: "",
  ticket_assigned_date: null,
  ticket_assigned_status: null,
  //new ticket/wizard
  wizLevel: "",
  wizType: "",
  wizSubject: "",
  wizDescription: "",
  wizAttachment: "",
  wizPermission: null,
  wizTextOptIn: null,
  wizSubmitTime: "",
  wizUnitNumber: "",
  wizTenantDisclaimer: "",
  //existing notes
  notes: [],
  //new note
  noteTitle: "",
  noteDescription: "",
  noteAttachment: null,
  noteSubmitTime: "",
  // current ticket view
  currentTicket: {}

};
//////////////////////////////////////
//constants
//user related
const SET_USER_ID = "SET_USER_ID";
const SET_USER_NAME = "SET_USER_NAME";
const SET_USER_ROLE = "SET_USER_ROLE";
const SET_USER_COMPLEX = "SET_USER_COMPLEX";
//worker related
const SET_WORKERS = "SET_WORKERS";
const SET_ASSIGNED_WORKER = "SET_ASSIGNED_WORKER";
//existing ticket related
const SET_TICKETS = "SET_TICKETS";
const SET_WORKER_ID = "SET_WORKER_ID";
const SET_WORKER_NAME = "SET_WORKER_NAME";
const SET_TICKET_STATUS = "SET_TICKET_STATUS";
const SET_TICKET_ASSIGNED_DATE = "SET_TICKET_ASSIGNED_DATE";
const SET_TICKET_ASSIGNED_STATUS = "SET_TICKET_ASSIGNED_STATUS";
//new ticket/wizard
const SET_WIZ_LEVEL = "SET_WIZ_LEVEL";
const SET_WIZ_TYPE = "SET_WIZ_TYPE";
const SET_WIZ_SUBJECT = "SET_WIZ_SUBJECT";
const SET_WIZ_DESCRIPTION = "SET_WIZ_DESCRIPTION";
const SET_WIZ_ATTACHMENT = "SET_WIZ_ATTACHMENT";
const SET_WIZ_PERMISSION = "SET_WIZ_PERMISSION";
const SET_WIZ_TEXT_OPT_IN = "SET_WIZ_TEXT_OPT_IN";
const SET_WIZ_SUBMIT_TIME = "SET_WIZ_SUBMIT_TIME";
const SET_WIZ_UNIT_NUMBER = "SET_WIZ_UNIT_NUMBER";
const SET_WIZ_TENANT_DISCLAIMER = "SET_WIZ_TENANT_DISCLAIMER";
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
export function setUserComplex(complex) {
  return {
    type: SET_USER_COMPLEX,
    payload: complex
  };
}
//worker related
export function setWorkers(workers) {
  return {
    type: SET_WORKERS,
    payload: workers
  };
}
export function setAssignedWorker(worker) {
  return {
    type: SET_ASSIGNED_WORKER,
    payload: worker
  };
}
//existing ticket related
export function setTickets(tickets) {
  return {
    type: SET_TICKETS,
    payload: tickets
  };
}
export function setWorkerId(id) {
  return {
    type: SET_WORKER_ID,
    payload: id
  };
}
export function setWorkerName(name) {
  return {
    type: SET_WORKER_NAME,
    payload: name
  };
}
export function setTicketStatus(status) {
  return {
    type: SET_TICKET_STATUS,
    payload: status
  };
}
export function setTicketAssignedDate(date) {
  return {
    type: SET_TICKET_ASSIGNED_DATE,
    payload: date
  };
}
export function setTicketAssignedStatus(status) {
  return {
    type: SET_TICKET_STATUS,
    payload: status
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
export function setWizSubject(subject) {
  return {
    type: SET_WIZ_SUBJECT,
    payload: subject
  };
}
export function setWizDesc(desc) {
  return {
    type: SET_WIZ_DESCRIPTION,
    payload: desc
  };
}
export function setWizAttachment(att) {
  return {
    type: SET_WIZ_ATTACHMENT,
    payload: att
  };
}
export function setWizPermission(permission) {
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
export function setWizSubmitTime(time) {
  return {
    type: SET_WIZ_SUBMIT_TIME,
    payload: time
  };
}
export function setWizUnitNumber(num) {
  return {
    type: SET_WIZ_UNIT_NUMBER,
    payload: num
  };
}
export function setWizTenantDisclaimer(disclaimer) {
  return {
    type: SET_WIZ_TENANT_DISCLAIMER,
    payload: disclaimer
  }
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
    case SET_USER_COMPLEX:
      return Object.assign({}, state, {
        userComplex: payload
      });
    //worker
    case SET_WORKERS:
      return Object.assign({}, state, {
        workers: payload
      });
    case SET_ASSIGNED_WORKER:
      return Object.assign({}, state, {
        assigned_worker: payload
      });
    //existing tix/////////
    case SET_TICKETS:
      return Object.assign({}, state, {
        tickets: payload
      });
    case SET_WORKER_ID:
      return Object.assign({}, state, {
        worker_id: payload
      });
    case SET_WORKER_NAME:
      return Object.assign({}, state, {
        worker_name: payload
      });
    case SET_TICKET_STATUS:
      return Object.assign({}, state, {
        ticket_status: payload
      });
    case SET_TICKET_ASSIGNED_DATE:
      return Object.assign({}, state, {
        ticket_assigned_date: payload
      });
    case SET_TICKET_ASSIGNED_STATUS:
      return Object.assign({}, state, {
        ticket_assigned_status: payload
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
    case SET_WIZ_SUBJECT:
      return Object.assign({}, state, {
        wizSubject: payload
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
    case SET_WIZ_SUBMIT_TIME:
      return Object.assign({}, state, {
        wizSubmitTime: payload
      });
    case SET_WIZ_UNIT_NUMBER:
      return Object.assign({}, state, {
        wizUnitNumber: payload
      });
    case SET_WIZ_TENANT_DISCLAIMER:
      return Object.assign({}, state, {
        wizTenantDisclaimer: payload
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

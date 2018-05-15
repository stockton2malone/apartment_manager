CREATE TYPE e_user_role AS ENUM (
    'Owner',
    'Tenant',
    'Worker'
);

create table Users (
    user_id VARCHAR(40) PRIMARY KEY,
    user_name TEXT,
    user_unit TEXT,
    user_complex TEXT,
    user_email TEXT,
    user_phone TEXT,
    text_permissions BOOLEAN,
    active_status BOOLEAN,
    user_role e_user_role
);

create table Complex (
    complex_id SERIAL PRIMARY KEY,
    complex_name TEXT,
    complex_units INTEGER,
    complex_address TEXT,
    complex_city TEXT,
    complex_state TEXT,
    complex_zip TEXT,
    owner_id VARCHAR(40),
    FOREIGN KEY (owner_id) REFERENCES Users(user_id)
);

create table Notes (
    notes_id SERIAL PRIMARY KEY,
    notes_description TEXT,
    ticket_id INTEGER,
    created_by VARCHAR(40),
    created_time TIMESTAMP,
    notes_attachement_id TEXT,
    FOREIGN KEY (ticket_id) REFERENCES Tickets(ticket_id),
    FOREIGN KEY (created_by) REFERENCES Users(user_id)
);


CREATE TYPE e_issue_type AS ENUM (
    'Maintenance',
    'Complaint',
    'Alert'
);

CREATE TYPE e_ticket_status AS ENUM(
    'New',
    'Assigned',
    'In Process',
    'Canceled',
    'Completed'
);

CREATE TYPE e_urgency_level AS ENUM (
    'Low',
    'Medium',
    'High',
    'Critical'
);

create table Tickets (
    ticket_id SERIAL PRIMARY KEY,
    created_by_id VARCHAR(40),
    complex_id INTEGER,
    creation_date TIMESTAMP,
    issue_type e_issue_type,
    issue_description TEXT,
    urgency_level e_urgency_level,
    permission_enter BOOLEAN,
    permission_notifications BOOLEAN,
    assigned_status BOOLEAN,
    assigned_date TIMESTAMP,
    worker_id VARCHAR(40),
    ticket_status e_ticket_status,
    completion_date TIMESTAMP,
    FOREIGN KEY (created_by_id) REFERENCES Users(user_id),
    FOREIGN KEY (complex_id) REFERENCES Complex(complex_id),
    FOREIGN KEY (worker_id) REFERENCES Users(user_id)
);

.replace("C:\\fakepath\\", "")

<div>Just testing: {this.props.wizType ? <h2>True</h2> : <h2>False</h2>}</div>

{`${this.props.wizAttachment ? this.props.wizAttachment.replace("C:\\fakepath\\", "") : 'No File Uploaded'}`}

"blob:http://localhost:3000/89034241-8134-49b8-8735-919f5ebfc1dc"


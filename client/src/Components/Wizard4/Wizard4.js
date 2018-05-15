import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
//function for setting creation time on state
import {setUserID, setWizType, setWizLevel, setWizSubject, setWizDesc, setWizAttachment, setWizPermission, setTextOptIn, setNoteAttachment} from '../../ducks/reducer';

import './Wizard4.css';

class Wizard4 extends Component {
    //POST request here - what do i need off of state
    componentWillMount() {
        console.log(this.props.noteAttachment)
    }

    componentDidMount() {
        console.log(this.props.noteAttachment)
        axios.get('/api/auth/me')
        .then(res => {
            console.log(res.data)
            axios.get('api/user')
            .then(res => {
                console.log('user info: ', res.data)
                this.props.setUserID(res.data.user_id)
            })
        })
        .catch(err => console.log(err))
    };

    handleSubmit() {
        const body = {
            complex_id: 1,
            issue_type: this.props.wizType,
            issue_description: this.props.wizSubject,
            urgency_level: this.props.wizLevel,
            permission_enter: this.props.wizPermission,
            permission_notifications: this.props.wizTextOptIn
        }
        axios.post('/api/ticket', body)
        .then(res => {
            axios.get(`/api/ticket/tenant/${this.props.userID}`)
            .then(res => {
                //console.log('this is my last ticket: ',res.data)
                const tickets = res.data
                const lastTicket = tickets.pop().ticket_id
                //console.log('this is my last ticket id: ', lastTicket)
                //const ticketID = ???
                const body = {
                    description: this.props.wizDescription,
                    file: this.props.noteAttachment,
                    id: this.props.userID
                }
                axios.post(`/api/ticket/${lastTicket}/notes`, body)
                .then(res => {
                    console.log("Posted: ", res.data)
                })
            })    
        })
        .catch(err => console.log(err))

        this.props.setWizType('');
        this.props.setWizLevel('');
        this.props.setWizSubject('');
        this.props.setWizDesc('');
        this.props.setWizAttachment('');
        this.props.setWizPermission(null);
        this.props.setTextOptIn(null);
        this.props.setNoteAttachment(null);
    }
    //wizSubject to state

    render() {

        return(
            <div className="ticketSummaryContainer">
                <div className="vert-align">
                    <h3>Ticket Summary</h3>
                    <div className="summaryInfoContainer">
                        <div>Type of Issue: <span className="desc">{this.props.wizType}</span></div>
                        <br/>
                        <div>Urgency Level: <span className="desc">{this.props.wizLevel}</span></div>
                        <br/>
                        <div>Ticket Subject: <span className="desc">{this.props.wizSubject}</span></div>
                        <br/>
                        <div>Description of Issue: <span className="desc">{this.props.wizDescription}</span></div>
                        <br/>
                        <div className = 'preview'>Image/Video Upload: <img src={this.props.wizAttachment} height="350" alt="Image preview..."/></div>
                        <br/>
                        <div>Permission to Enter? <span className="desc">{`${this.props.wizPermission ? 'Yes' : 'No'}`}</span></div>
                        <br/>
                        <div>Tenant Disclaimers:</div>
                        <br/>
                        <div>Text Notifications? <span className="desc">{`${this.props.wizTextOptIn ? 'Yes' : 'No'}`}</span></div>
                        <div className="navigation">
                            <Link to="/wizard3"><div id="orange" className="previous-step">Previous     Step</div></Link>
                            <Link to="/"><div id="blue" className="next-step" onClick={() => this.handleSubmit()}>Submit Ticket</div></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//redux stuff here
let mapStateToProps = state => {
    const {noteAttachment, userID, userName, userRole, wizLevel, wizType, wizSubject, wizDescription, wizAttachment, wizPermission, wizTextOptIn, wizSubmitTime} = state;
    return{
        userID,
        userName,
        userRole,
        wizLevel,
        wizType,
        wizSubject,
        wizDescription,
        wizAttachment,
        wizPermission,
        wizTextOptIn,
        wizSubmitTime,
        noteAttachment
    }
};

export default connect(mapStateToProps, {setUserID, setWizType, setWizLevel, setWizSubject, setWizDesc, setWizAttachment, setWizPermission, setTextOptIn, setNoteAttachment})(Wizard4)
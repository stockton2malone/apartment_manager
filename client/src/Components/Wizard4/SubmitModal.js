import React, {Component} from "react";
import {connect} from 'react-redux';
import axios from 'axios';
import Popup from "reactjs-popup";
import {Link} from 'react-router-dom';
import {setUserID, setWizType, setWizLevel, setWizSubject, setWizDesc, setWizAttachment, setWizPermission, setWizUnitNumber, setWizTenantDisclaimer, setTextOptIn, setNoteAttachment} from '../../ducks/reducer';

import './SubmitModal.css';

class SubmitModal extends Component {
    handleSubmit() {

        const body = {
            complex_id: this.props.user,
            issue_type: this.props.wizType,
            issue_description: this.props.wizSubject,
            urgency_level: this.props.wizLevel,
            permission_enter: this.props.wizPermission,
            permission_notifications: this.props.wizTextOptIn,
            unit_number: this.props.wizUnitNumber,
            tenant_disclaimer: this.props.wizTenantDisclaimer
        }
        axios.post('/api/ticket', body)
        .then(res => {
            axios.get(`/api/tickets/${this.props.userRole}/${this.props.userID}`)
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
        this.props.setWizUnitNumber('');
        this.props.setWizTenantDisclaimer('');
        this.props.setTextOptIn(null);
        this.props.setNoteAttachment(null);
    }
    render () {
        return(
            <div>
        <Popup
            trigger={<div id="blue" className="next-step">Submit Ticket</div>}
            modal
            closeOnDocumentClick
        >
            <div className="modal">
                <p>Are you sure you want to submit this work order?</p>
            </div>

            <div id="sub-navigation">
                {/* <Link to="/wizard4"><div id="green" className="next-step">Close</div></Link> */}
                <Link to="/"><div id="green" className="next-step" onClick={() => this.handleSubmit()}>Yes</div></Link>
            </div>
            
        </Popup>
    </div>
        )
    }
}

let mapStateToProps = state => {
    const {noteAttachment, userID, userName, userRole, userComplex, wizLevel, wizType, wizSubject, wizDescription, wizAttachment, wizPermission, wizUnitNumber, wizTenantDisclaimer, wizTextOptIn, wizSubmitTime} = state;
    return{
        userID,
        userName,
        userRole,
        userComplex,
        wizLevel,
        wizType,
        wizSubject,
        wizDescription,
        wizAttachment,
        wizPermission,
        wizUnitNumber,
        wizTenantDisclaimer,
        wizTextOptIn,
        wizSubmitTime,
        noteAttachment
    }
};

export default connect(mapStateToProps, {setUserID, setWizType, setWizLevel, setWizSubject, setWizDesc, setWizAttachment, setWizPermission, setWizUnitNumber, setWizTenantDisclaimer, setTextOptIn, setNoteAttachment})(SubmitModal)
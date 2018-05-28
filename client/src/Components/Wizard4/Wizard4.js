import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import SubmitModal from './SubmitModal';
//function for setting creation time on state
import {setUserID, setUserComplex, setWizType, setWizLevel, setWizSubject, setWizDesc, setWizAttachment, setWizPermission, setWizUnitNumber, setWizTenantDisclaimer, setTextOptIn, setNoteAttachment} from '../../ducks/reducer';

import './Wizard4.css';


class Wizard4 extends Component {
    //POST request here - what do i need off of state
    /* componentWillMount() {
        console.log(this.props.noteAttachment)
    } */

    componentDidMount() {
        console.log(this.props.noteAttachment)
        axios.get('/api/auth/me')
        .then(res => {
            console.log(res.data)
            axios.get('api/user')
            .then(res => {
                console.log('user info: ', res.data)
                this.props.setUserID(res.data.user_id)
                this.props.setUserComplex(res.data.user_complex)
            })
        })
        .catch(err => console.log(err))
    };

    /* handleSubmit() {
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
            axios.get(`/api/tickets/${this.props.userRole}/${this.props.userID}`)
            .then(res => {
                console.log('this is my last ticket: ',res.data)
                const tickets = res.data
                const lastTicket = tickets.pop().ticket_id
                console.log('this is my last ticket id: ', lastTicket)
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
    } */
    //wizSubject to state

    handleCancel() {
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

    render() {
        const { setUserID, setWizType, setWizLevel, setWizSubject, setWizDesc, setWizAttachment, setWizPermission, setWizUnitNumber, setWizTenantDisclaimer, setTextOptIn, setNoteAttachment } = this.props;


        return(
            <div className="ticketSummaryContainer">
                <div className="vert-align">
                    <h2>Ticket Summary</h2>
                    <div className="summaryInfoContainer">
                        <div className="cancel" onClick={() => this.handleCancel()}>
                            <Link id="cancelButtonLink" to={'/'}>
                                <div className="cancelButton"><h2>X</h2></div>
                            </Link>
                        </div>
                        
                        <div className = "sum-items">Type of Issue: <span className="desc">{this.props.wizType}</span></div>
                        <br/>
                        <div className = "sum-items">Urgency Level: <span className="desc">{this.props.wizLevel}</span></div>
                        <br/>
                        <div className = "sum-items">Ticket Subject: <span className="desc">{this.props.wizSubject}</span></div>
                        <br/>
                        <div className = "sum-items">Unit Number: <span className="desc">{this.props.wizUnitNumber}</span></div>
                        <br/>
                        <div className = "sum-items">Description of Issue: <span className="desc">{this.props.wizDescription}</span></div>
                        <br/>
                        <div className = 'sum-items'>Image/Video Upload: </div>
                        <br/>
                        <div className="sum-items"><img src={this.props.wizAttachment} height="350" alt="Image preview..."/></div>
                        <br/>
                        <div className = "sum-items">Permission to Enter? <span className="desc">{`${this.props.wizPermission ? 'Yes' : 'No'}`}</span></div>
                        <br/>
                        <div className = "sum-items">Tenant Disclaimers: <span className="desc">{this.props.wizTenantDisclaimer}</span></div>
                        <br/>
                        <div className = "sum-items">Text Notifications? <span className="desc">{`${this.props.wizTextOptIn ? 'Yes' : 'No'}`}</span></div>
                        <div id="navigation">
                            <Link to="/wizard3"><div id="orange" className="previous-step">Previous     Step</div></Link>
                            {/* <Link to="/"><div id="blue" className="next-step" onClick={() => this.handleSubmit()}>Submit Ticket</div></Link> */}
                            <SubmitModal />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//redux stuff here
let mapStateToProps = state => {
    const {noteAttachment, userID, userName, userRole, wizLevel, wizType, wizSubject, wizDescription, wizAttachment, wizPermission, wizUnitNumber, wizTenantDisclaimer, wizTextOptIn, wizSubmitTime, setUserComplex} = state;
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
        wizUnitNumber,
        wizTenantDisclaimer,
        wizTextOptIn,
        wizSubmitTime,
        noteAttachment
    }
};

export default connect(mapStateToProps, { setUserID, setWizType, setWizLevel, setWizSubject, setWizDesc, setWizAttachment, setWizPermission, setWizUnitNumber, setWizTenantDisclaimer, setTextOptIn, setNoteAttachment })(Wizard4)
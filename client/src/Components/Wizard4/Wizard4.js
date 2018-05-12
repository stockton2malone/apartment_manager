import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
//function for setting creation time on state
import {setWizSubmitTime} from '../../ducks/reducer';

import './Wizard4.css';

class Wizard4 extends Component {
    //POST request here - what do i need off of state
    componentWillMount() {
        console.log(this.props.noteAttachment)
    }
    handleSave() {
        const body = {
            created_by_id: this.props.userID,
            complex_id: this.props.userID,
            creation_date: this.props.noteSubmitTime,
            issue_type: this.props.wizType,
            issue_description: this.props.wizDescription,
            urgency_level: this.props.wizLevel,
            permission_enter: this.props.wizPermission,
            permission_notifications: this.props.wizTextOptIn,
        }
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
                        <div>Image/Video Upload: <img src={this.props.wizAttachment} height="200" alt="Image preview..."/></div>
                        <br/>
                        <div>Permission to Enter? <span className="desc">{this.props.wizPermission}</span></div>
                        <br/>
                        <div>Tenant Disclaimers:</div>
                        <br/>
                        <div>Text Notifications? <span className="desc">{this.props.wizTextOptIn}</span></div>
                        <div className="navigation">
                            <Link to="/wizard3"><div id="orange" className="previous-step">Previous     Step</div></Link>
                            <Link to="/"><div id="blue" className="next-step">Submit Ticket</div></Link>
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

export default connect(mapStateToProps, {setWizSubmitTime})(Wizard4)
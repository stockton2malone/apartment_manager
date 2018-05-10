import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
//function for setting creation time on state
import {setWizSubmitTime} from '../../ducks/reducer';

import './Wizard4.css';

class Wizard4 extends Component {
    //POST request here - what do i need off of state
    //wizSubject to state
    render() {
        return(
            <div className="ticketSummaryContainer">
                <h3>Ticket Summary</h3>
                <div className="summaryInfoContainer">
                    <div>Type of Issue:</div>
                    <br/>
                    <div>Urgency Level:</div>
                    <br/>
                    <div>Description of Issue:</div>
                    <br/>
                    <div>Image/Video Upload:</div>
                    <br/>
                    <div>Permission to Enter?</div>
                    <br/>
                    <div>Tenant Disclaimers:</div>
                    <br/>
                    <div>Text Notifications?</div>
                </div>
                <div className="navigation">
                    <Link to="/wizard3"><div id="orange" className="previous-step">Previous Step</div></Link>
                    <Link to="/"><div id="blue" className="next-step">Submit Ticket</div></Link>
                </div>
            </div>
        )
    }
}

//redux stuff here
let mapStateToProps = state => {
    const {userID, userName, userRole, wizLevel, wizType, wizSubject, wizDescription, wizAttachment, wizPermission, wizTextOptIn, wizSubmitTime} = state;
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
        wizSubmitTime
    }
};

export default connect(mapStateToProps, {setWizSubmitTime})(Wizard4)
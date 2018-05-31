import React, {Component} from 'react';
import './Wizard1.css';
import { Link } from 'react-router-dom';
import {setUserID, setWizType, setWizLevel, setWizSubject, setWizDesc, setWizAttachment, setWizPermission, setWizUnitNumber, setWizTenantDisclaimer, setTextOptIn, setNoteAttachment, setWizComplexOwner} from '../../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';

class Wizard1 extends Component {
    componentDidMount(){
        axios.get('/api/owner')
        .then(res => {
        console.log('complex owner: ', res.data)
        this.props.setWizComplexOwner(res.data[0].user_id)
        })
        .catch(err => console.log(err))
    }
    handleCancel() {
        this.props.setWizType('');
        this.props.setWizLevel('');
        this.props.setWizSubject('');
        this.props.setWizDesc('');
        this.props.setWizAttachment('');
        this.props.setWizPermission(null);
        this.props.setWizUnitNumber('');
        this.props.setWizTenantDisclaimer('');
        this.props.setWizComplexOwner('');
        this.props.setTextOptIn(null);
        this.props.setNoteAttachment(null);
    }

    render() {
      const { setUserID, setWizType, setWizLevel, setWizSubject, setWizDesc, setWizAttachment, setWizPermission, setWizUnitNumber, setWizTenantDisclaimer, setTextOptIn, setNoteAttachment } = this.props;
      return (
       <div className="Wizard1">
        <div className="title">
            <h2>Report An Issue</h2>
        </div>
        <div className="Wizard1Container">

        <div className="cancel" onClick={() => this.handleCancel()}>
            <Link id="cancelButtonLink" to={'/'}>
                <div className="cancelButton"><h2>X</h2></div>
            </Link>
        </div>
            
            <h3>Issue Type</h3>

            <div id="issueType">
                <label class="red"><input type="radio" name="issueType" value="Alert" checked={this.props.wizType === "Alert"} onChange={event => setWizType(event.target.value)} required/><span>Alert</span></label>
                <label class="orange"><input type="radio" name="issueType" value="Complaint" checked={this.props.wizType === "Complaint"} onChange={event => setWizType(event.target.value)}/><span>Complaint</span></label>
                <label class="yellow"><input type="radio" name="issueType" value="Maintenance" checked={this.props.wizType === "Maintenance"} onChange={event => setWizType(event.target.value)}/><span>Maintenance</span></label>
            </div>      

            <h3>Urgency Level</h3>      
            
            <div id="urgencyLevel">
                <label class="red"><input type="radio" name="urgencyLevel" value="Critical" checked={this.props.wizLevel === "Critical"} onChange={event => setWizLevel(event.target.value)} required/><span>Critical</span></label>
                <label class="orange"><input type="radio" name="urgencyLevel" value="High" checked={this.props.wizLevel === "High"} onChange={event => setWizLevel(event.target.value)}/><span>High</span></label>
                <label class="yellow"><input type="radio" name="urgencyLevel" value="Medium" checked={this.props.wizLevel === "Medium"} onChange={event => setWizLevel(event.target.value)}/><span>Medium</span></label>
                <label class="blue"><input type="radio" name="urgencyLevel" value="Low" checked={this.props.wizLevel === "Low"} onChange={event => setWizLevel(event.target.value)}/><span>Low</span></label>
            </div>

          
        </div>

        <div className="nextStep">
            <Link id="nextStepLink" to={'/wizard2'}>
                <div className="nextStepButton"><p>Next Step</p></div>
            </Link>
          </div>

       </div>
      );
    }
  }

  let mapStateToProps = state => {
    const {noteAttachment, userID, userName, userRole, wizLevel, wizType, wizSubject, wizDescription, wizAttachment, wizPermission, wizUnitNumber, wizTenantDisclaimer, wizTextOptIn, wizSubmitTime} = state;
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

export default connect(mapStateToProps, { setUserID, setWizType, setWizLevel, setWizSubject, setWizDesc, setWizAttachment, setWizPermission, setWizUnitNumber, setWizTenantDisclaimer, setTextOptIn, setNoteAttachment, setWizComplexOwner })(Wizard1);
import React, {Component} from 'react';
import './Wizard3.css';
import { Link } from 'react-router-dom';
import {setUserID, setWizType, setWizLevel, setWizSubject, setWizDesc, setWizAttachment, setWizPermission, setTextOptIn, setNoteAttachment} from '../../ducks/reducer';
import { connect } from 'react-redux';

import './DisclaimerModal';
import DisclaimerModal from './DisclaimerModal';

class Wizard3 extends Component {
    handleCancel() {
        this.props.setWizType('');
        this.props.setWizLevel('');
        this.props.setWizSubject('');
        this.props.setWizDesc('');
        this.props.setWizAttachment('');
        this.props.setWizPermission(null);
        this.props.setTextOptIn(null);
        this.props.setNoteAttachment(null);
    }

    render() {
        const { setUserID, setWizType, setWizLevel, setWizSubject, setWizDesc, setWizAttachment, setWizPermission, setTextOptIn, setNoteAttachment } = this.props;
        return (
       <div className="Wizard3">
        <div className="title">
            <h2>Details / Notifications</h2>
        </div>
        <div className="Wizard3Container">

            <div className="cancel" onClick={() => this.handleCancel()}>
                <Link id="cancelButtonLink" to={'/'}>
                    <div className="cancelButton"><h2>X</h2></div>
                </Link>
            </div>
            
            <h4>Maintenance Staff may enter my unit if I do not answer the door.</h4>

            <div id="permission">
                <label class="green"><input type="radio" name="permission" value={true} checked={this.props.wizPermission === true} onChange={event => setWizPermission(true)} required/><span>Yes</span></label>
                <label class="red"><input type="radio" name="permission" value={false} checked={this.props.wizPermission === false} onChange={event => setWizPermission(false)}/><span>No</span></label>

            </div> 

            <DisclaimerModal/> 

            <h4>I would like to receive updates on my issue via text message.</h4>      
            
            <div id="textOptIn">
                <label class="green"><input type="radio" name="textOptIn" value={true} checked={this.props.wizTextOptIn === true} onChange={event => setTextOptIn(true)} required/><span>Yes</span></label>
                <label class="red"><input type="radio" name="textOptIn" value={false} checked={this.props.wizTextOptIn === false} onChange={event => setTextOptIn(false)}/><span>No</span></label>
            </div> 
        </div>

        <div className="navigation">
            <Link to="/wizard2"><div id="orange" className="previous-step">Previous Step</div></Link>
            <Link to="/wizard4"><div id="blue" className="next-step">Next Step</div></Link>
        </div>

       </div>
      );
    }
  }

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

export default connect(mapStateToProps, { setUserID, setWizType, setWizLevel, setWizSubject, setWizDesc, setWizAttachment, setWizPermission, setTextOptIn, setNoteAttachment })(Wizard3);
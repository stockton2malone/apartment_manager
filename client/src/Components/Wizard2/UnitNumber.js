import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setUserID, setWizType, setWizLevel, setWizSubject, setWizDesc, setWizAttachment, setWizPermission, setWizUnitNumber, setTextOptIn, setNoteAttachment} from '../../ducks/reducer';

class UnitNumber extends Component {
    handleCancel() {
        this.props.setWizType('');
        this.props.setWizLevel('');
        this.props.setWizSubject('');
        this.props.setWizDesc('');
        this.props.setWizAttachment('');
        this.props.setWizPermission(null);
        this.props.setWizUnitNumber('');
        this.props.setTextOptIn(null);
        this.props.setNoteAttachment(null);
    }

    
   
    render() {
        //pull state off of props
        const { setUserID, setWizType, setWizLevel, setWizSubject, setWizDesc, setWizAttachment, setWizPermission, setWizUnitNumber, setTextOptIn, setNoteAttachment } = this.props;
        
        return(
            <div>
                <input type="text" name="unitNumber" id="unitNumber" onChange={event => setWizUnitNumber(event.target.value)} placeholder="Unit Number" value={this.props.wizUnitNumber}/>
            </div>    
        )    
    }
}


//redux stuff here
let mapStateToProps = state => {
    const {noteAttachment, userID, userName, userRole, wizLevel, wizType, wizSubject, wizDescription, wizAttachment, wizPermission, wizUnitNumber,wizTextOptIn, wizSubmitTime} = state;
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
        wizUnitNumber,
        noteAttachment
    }
};

export default connect(mapStateToProps, { setUserID, setWizType, setWizLevel, setWizSubject, setWizDesc, setWizAttachment, setWizPermission, setWizUnitNumber, setTextOptIn, setNoteAttachment })(UnitNumber)
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setUserID, setWizType, setWizLevel, setWizSubject, setWizDesc, setWizAttachment, setWizPermission, setTextOptIn, setNoteAttachment} from '../../ducks/reducer';

import './Wizard2.css';

class Wizard2 extends Component {
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

    previewFile() {
        let preview = document.querySelector('img');
        let file = document.querySelector('input[type=file]').files[0];
    
        let reader = new FileReader();

        reader.addEventListener("load", () => {
            preview.src = reader.result;
            this.props.setNoteAttachment(reader.result);
            //console.log('noteAttachment: ',this.props.noteAttachment)
        }, false);

        if(file) {
            reader.readAsDataURL(file);
        };
    }; 
    
    handleLoadLocalFile = (event) => {
        event.preventDefault();
        const {files} = event.target;
        console.log(files[0])
        const localImageUrl = URL.createObjectURL(files[0]);

        this.props.setWizAttachment(localImageUrl)
    }
   
    render() {
        //pull state off of props
        const { setUserID, setWizType, setWizLevel, setWizSubject, setWizDesc, setWizAttachment, setWizPermission, setTextOptIn, setNoteAttachment } = this.props;
        const testObj = {name: 'brett', test: "does it work?"}
        //what i want returned
        return(
            <div className="parent-div">
                <div className="vert-align">
                    <div className="header"><h2>Describe the Issue</h2>
                    </div>
                    {/* <div className="status">Step Indicator Here
                    </div> */}

                    <div className="inputs">

                        <div className="cancel" onClick={() => this.handleCancel()}>
                            <Link id="cancelButtonLink" to={'/'}>
                                <div className="cancelButton"><h2>X</h2></div>
                            </Link>
                        </div>

                        <input id="note-title" value = {this.props.wizSubject} type="text" placeholder="Ticket Subject" size="20" onChange={(e) => setWizSubject(e.target.value)}/>
                        <textarea name="note-description" id="note-description" value = {this.props.wizDescription} cols="20" rows="12" placeholder="Describe your issue here" onChange={(e) => setWizDesc(e.target.value)}></textarea>
                        <div className="file-upload">
                            <label htmlFor="file">Choose image/video file(s) to upload</label>
                            <br/>
                            <input id="note-attachment" name="note-attachment" type="file" multiple accept="image/*,video/*" onChange={(e) => {this.previewFile(); this.handleLoadLocalFile(e); setNoteAttachment(e.target.files[0]);}}/>
                            <br/>
                            <div className="note-pic"><img src={this.props.wizAttachment}  alt="Image preview..."/></div>
                            <br/>
                        </div> 
                        <br/>
                        <div className="navigation">
                            <Link to="/wizard1"><div id="orange" className="previous-step">Previous Step</div></Link>
                            <Link to="/wizard3"><div id="blue" className="next-step">Next Step</div></Link>
                        </div> 
                    </div>
                </div>  
            </div>    
        )    
    }
//parent div
//vert align div
//header div
//status div
//input div
    //note title - 'Issue Description'
    //note description - text box (required)
    //note attachment - upload image/video - html input file type
//navigation div
//back to wiz1 and forward to wiz3 buttons
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

export default connect(mapStateToProps, { setUserID, setWizType, setWizLevel, setWizSubject, setWizDesc, setWizAttachment, setWizPermission, setTextOptIn, setNoteAttachment })(Wizard2)
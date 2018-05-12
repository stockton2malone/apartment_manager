import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setWizSubject, setWizDesc, setWizAttachment, setNoteAttachment} from '../../ducks/reducer';

import './Wizard2.css';

class Wizard2 extends Component {
    previewFile() {
        let preview = document.querySelector('img');
        let file = document.querySelector('input[type=file').files[0];
        let reader = new FileReader();

        reader.addEventListener("load", () => {
            preview.src = reader.result;
        }, false);

        if(file) {
            reader.readAsDataURL(file);
        };
    };     
   
    render() {
        //pull state off of props
        const {setWizSubject, setWizDesc, setWizAttachment, setNoteAttachment} = this.props;
        //what i want returned
        return(
            <div className="parent-div">
                <div className="vert-align">
                    <div className="header"><h2>Describe the Issue</h2>
                    </div>
                    {/* <div className="status">Step Indicator Here
                    </div> */}
                    <div className="inputs">
                        <input id="note-title" value = {this.props.wizSubject} type="text" placeholder="Ticket Subject" size="20" onChange={(e) => setWizSubject(e.target.value)}/>
                        <textarea name="note-description" id="note-description" value = {this.props.wizDescription} cols="20" rows="12" placeholder="Describe your issue here" onChange={(e) => setWizDesc(e.target.value)}></textarea>
                        <div classname="file-upload">
                            <label htmlFor="file">Choose image/video file(s) to upload</label>
                            <br/>
                            <input id="note-attachment" name="note-attachment" type="file" multiple accept="image/*,video/*" onChange={(e) => {setWizAttachment(e.target.value); this.previewFile(); setNoteAttachment(e.target.files[0]);}}/> 
                            <br/>
                            <img src="" height="200" alt="Image preview..."/>
                        </div> 
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
    const {noteAttachment, wizSubject, wizDescription, wizAttachment} = state;
    return{
        wizSubject,
        wizDescription,
        wizAttachment,
        noteAttachment
    }
};

export default connect(mapStateToProps, {setNoteAttachment, setWizSubject, setWizDesc, setWizAttachment})(Wizard2)
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setWizSubject, setWizDesc, setWizAttachment} from '../../ducks/reducer';

import './Wizard2.css';

class Wizard2 extends Component {   
    render() {
        //pull state off of props
        const {setWizSubject, setWizDesc, setWizAttachment} = this.props;
        //what i want returned
        return(
            <div className="parent-div">
                <div className="vert-align">
                    <div className="header"><h2>Describe the Issue</h2>
                    </div>
                    {/* <div className="status">Step Indicator Here
                    </div> */}
                    <div className="inputs">
                        <input id="note-title" type="text" value = {this.props.wizSubject} placeholder="Ticket Subject" size="20" onChange={(e) => setWizSubject(e.target.value)}/>
                        <textarea name="note-description" id="note-description" value = {this.props.wizDescription} cols="20" rows="12" placeholder="Describe your issue here" onChange={(e) => setWizDesc(e.target.value)}></textarea>
                        <div classname="file-upload">
                            <label htmlFor="file">Choose image/video file(s) to upload</label>
                            <br/>
                            <input id="note-attachment" name="note-attachment" type="file" multiple accept="image/*,video/*" onChange={(e) => setWizAttachment(e.target.value)}/> 
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
    const {wizSubject, wizDescription, wizAttachment} = state;
    return{
        wizSubject,
        wizDescription,
        wizAttachment
    }
};

export default connect(mapStateToProps, {setWizSubject, setWizDesc, setWizAttachment})(Wizard2)
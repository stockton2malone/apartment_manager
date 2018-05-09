import React, {Component} from 'react';
import './Wizard1.css';
import { Link } from 'react-router-dom';
import { setWizType, setWizLevel } from '../../ducks/reducer';
import { connect } from 'react-redux';

class Wizard1 extends Component {
    render() {
      const { setWizType, setWizLevel } = this.props;
      return (
       <div className="Wizard1">
        <div className="title">
            <h2>Report An Issue</h2>
        </div>
        <div className="Wizard1Container">
            
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

function mapStateToProps( state ) {
    const { wizType, wizLevel } = state;
    return {
        wizType,
        wizLevel
    };
}

export default connect(mapStateToProps, { setWizType, setWizLevel })(Wizard1);
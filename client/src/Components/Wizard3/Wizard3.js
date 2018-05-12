import React, {Component} from 'react';
import './Wizard3.css';
import { Link } from 'react-router-dom';
import { setWizPermission, setTextOptIn } from '../../ducks/reducer';
import { connect } from 'react-redux';

import './DisclaimerModal';
import DisclaimerModal from './DisclaimerModal';

class Wizard3 extends Component {
    render() {
      const { setWizPermission, setTextOptIn } = this.props;
      return (
       <div className="Wizard3">
        <div className="title">
            <h2>Details / Notifications</h2>
        </div>
        <div className="Wizard3Container">
            
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

function mapStateToProps( state ) {
    const { wizPermission, wizTextOptIn } = state;
    return {
        wizPermission,
        wizTextOptIn
    };
}

export default connect(mapStateToProps, { setWizPermission, setTextOptIn })(Wizard3);
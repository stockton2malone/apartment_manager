import React, {Component} from "react";
import Popup from "reactjs-popup";
import './DisclaimerModal.css';
import {connect} from 'react-redux';
import {setWizTenantDisclaimer} from '../../ducks/reducer';

class DisclaimerModal extends Component {
    render() {
        const {setWizTenantDisclaimer} = this.props;

        return (

            <div className="popup">
                <Popup
                    trigger={<button className="modalButton"> Disclaimer </button>}
                    modal
                    closeOnDocumentClick
                >
                    <div className="modal">
                        <p>Repair or damage caused by your negligence or misuse is your responsibility.  In such cases, repairs will be made, but you will be charged for the cost of the labor and materials.</p>
                        <div>
                        <label htmlFor="tenantDisclaimer">Information for Maintenance:</label>
                        <textarea name="tenantDisclaimer" id="tenantDisclaimer" value = {this.props.wizTenantDisclaimer} cols="20" rows="12" placeholder="Should maintenance be aware of anything before entering your property?" onChange={(e) => setWizTenantDisclaimer(e.target.value)}></textarea>
                        </div>
                    </div>
                    
                </Popup>
            </div>
        )    
    }
}

let mapStateToProps = state => {
    const {wizTenantDisclaimer} = state;
    return {
        wizTenantDisclaimer
    }
}

export default connect(mapStateToProps, { setWizTenantDisclaimer })(DisclaimerModal);
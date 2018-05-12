import React from "react";
import Popup from "reactjs-popup";
import './DisclaimerModal.css';

export default () => (
    <div className="popup">
        <Popup
            trigger={<button className="modalButton"> Disclaimer </button>}
            modal
            closeOnDocumentClick
        >
            <div className="modal">
                <p>Repair or damage caused by your negligence or misuse is your responsibility.  In such cases, repairs will be made, but you will be charged for the cost of the labor and materials.</p>
            </div>
            
        </Popup>
    </div>
  
);
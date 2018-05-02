import React, { Component } from "react";
import "./OnboardView.css";

class OnboardView extends Component {
  render() {
    return (
      <div className="onboardViewContainer">
        <div>
          <h1>Welcome to APP NAME</h1>
        </div>
        <div className="onboardInputs">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Address" />
          <select name="complexSelect" id="">
            <option value="">Select Complex</option>
            <option value="camdenFarmersMarket">Camden Farmer's Market</option>
            <option value="butlerBrothers">Butler Brothers</option>
            <option value="oramCo">Oram Co. Apartments</option>
            <option value="lashLofts">Lash Lofts</option>
          </select>
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Phone Number" />
          <div className="optIn">
            <input type="checkbox" name="notificationOptIn" id="" />
            <label htmlFor="notificationOptIn">
              By checking this box you agree to receive text/email notifications
              from APP NAME
            </label>
          </div>
          <button type="submit">Submit</button>
        </div>
      </div>
    );
  }
}

export default OnboardView;

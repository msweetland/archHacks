import React, { Component } from "react";
//import "./Home.css";
import Login from "../Login";

export default class PatientHome extends Component {

  constructor(props) {
      super(props);
      this.state = {loggedIn:false};

      this.handleLoggedIn = this.handleLoggedIn.bind(this);
  }

  handleLoggedIn = (e) => {
    this.setState({loggedIn:!this.state.loggedIn});
  }



  render() {
    return (
      <div>
        {this.state.loggedIn ?
          <div>
            patient dashboard





          </div> :
          <Login usertype="patient" handleLoggedIn={this.handleLoggedIn}/>
        }
      </div>
    );
  }
}

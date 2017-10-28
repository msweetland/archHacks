import React, { Component } from "react";
import Login from "../Login";

export default class DoctorHome extends Component {
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
            doctor dashboard





          </div> :
          <Login usertype="doctor" handleLoggedIn={this.handleLoggedIn}/>
        }
      </div>
    );
  }
}

import React, { Component } from "react";
//import "./Home.css";
import Webcam from 'react-webcam';
import { FormGroup,RadioGroup,Radio,Button } from "@blueprintjs/core";

export default class Login extends Component {

  constructor(props) {
      super(props);
      this.state = {};
  }





  render() {
    return (
      <div>
          {this.props.usertype} Login
          <Button onClick={this.props.handleLoggedIn}/>
      </div>
    );
  }
}

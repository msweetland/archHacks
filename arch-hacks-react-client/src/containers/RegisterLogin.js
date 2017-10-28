import React, { Component } from "react";

import { FormGroup,RadioGroup,Radio,Button } from "@blueprintjs/core";

export default class Registration extends Component {

  constructor(props) {
      super(props);
      this.state = {name:"", password: ""};
      this.sendRegistrationData = this.sendRegistrationData.bind(this);
  }

  sendRegistrationData = () => {

  }

  handleChange = (e) => {
    this.setState({name:e.target.value});
  }

  handlePass = (e) => {
    this.setState({password: e.target.value});
  }


  render() {
    return (
      <div>

        <FormGroup
            label="Enter your username:"
            labelFor="text-input"
            required={true}
        >
            <input
              id="text-input"
              value={this.state.name}
              onChange={this.handleChange}
            />
        </FormGroup>

        <FormGroup
            label="Enter your password: (maxLength 20)"
            labelFor="text-input"
            required={true}
        >
            <input
              id="text-input"
              type="password"
              value={this.state.password}
              onChange={this.handlePass}
              maxLength="20"
            />
        </FormGroup>


        <Button
          onClick={this.sendRegistrationData}
          text="Create Your Account"
        />


        <img style={{borderRadius: "50%"}} src={this.state.image}/>
      </div>
    );
  }

}

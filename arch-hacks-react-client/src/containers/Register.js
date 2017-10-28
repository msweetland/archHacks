import React, { Component } from "react";
import Webcam from 'react-webcam';
import { FormGroup,RadioGroup,Radio,Button } from "@blueprintjs/core";
import invokeApi from "../libs/awsLib";

export default class Registration extends Component {

  constructor(props) {
      super(props);
      this.state = {name:"", usertype: "patient", image : ""};
      this.sendRegistrationData = this.sendRegistrationData.bind(this);
      this.getBinary = this.getBinary.bind(this);
  }

  getBinary = (base64Image) => {

     let binaryImg = atob(base64Image);
     let length = binaryImg.length;
     let ab = new ArrayBuffer(length);
     let ua = new Uint8Array(ab);
     for (let i = 0; i < length; i++) {
       ua[i] = binaryImg.charCodeAt(i);
      }

      return ab;
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  handleChange = (e) => {
    this.setState({name:e.target.value});
  }

  handleUserType = (e) => {
    this.setState({usertype: e.target.value});
  }

  sendRegistrationData = () => {
    //let image = this.webcam.getScreenshot();
    if (this.state.name !== ""){
      const img = new Promise((resolve, reject) => {
        resolve(this.webcam.getScreenshot());
      });

      img.then((i) => {

        this.setState({image:i});

        console.log(this.state);
        invokeApi("/register","POST",this.state);
      });
    };
  }


  render() {
    return (
      <div>
        <Webcam
          style={{padding:"10px", borderRadius:"30px"}}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          audio={false}
        />

        <FormGroup
            label="Enter your name:"
            labelFor="text-input"
            required={true}
        >
            <input
              id="text-input"
              value={this.state.name}
              onChange={this.handleChange}
            />
        </FormGroup>

        <RadioGroup
            label="User Type"
            onChange={this.handleUserType}
            selectedValue={this.state.usertype}
        >
            <Radio label="Patient" value="patient" />
            <Radio label="Doctor" value="doctor" />
        </RadioGroup>
        <Button onClick={this.sendRegistrationData}/>
        <img style={{borderRadius: "50%"}} src={this.state.image}/>
      </div>
    );
  }

}

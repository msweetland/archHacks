import React, { Component } from "react";
import Webcam from 'react-webcam';
import { FormGroup,RadioGroup,Radio,Button } from "@blueprintjs/core";
import invokeApi from "../libs/awsLib";

export default class Registration extends Component {

  constructor(props) {
      super(props);
      this.state = {name:"", usertype: "patient", image : "", byteImage:""};
      this.sendRegistrationData = this.sendRegistrationData.bind(this);
      this.getBinary = this.getBinary.bind(this);
  }

  getBinary(encodedFile){

    var base64Image = encodedFile.split("data:image/jpeg;base64,")[1];
    var binaryImg = atob(base64Image);
    var length = binaryImg.length;
    var ab = new ArrayBuffer(length);
    var ua = new Uint8Array(ab);
    var binaryImg = atob(base64Image);
    var length = binaryImg.length;

    for (var i = 0; i < length; i++) {
      ua[i] = binaryImg.charCodeAt(i);
    }

    var blob = new Blob([ab], {
      type: "image/jpeg"
    });


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

        this.setState({image:i,byteImage:this.getBinary(i)});
        console.log(this.state);
        console.log(this.state.byteImage.toString());
        //let response = invokeApi("/register","POST",this.state);

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

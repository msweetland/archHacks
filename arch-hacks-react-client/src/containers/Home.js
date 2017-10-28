import React, { Component } from "react";
//import "./Home.css";
import { Icon } from "@blueprintjs/core";

const propTypes = {};

export default class Home extends Component {

  constructor(props) {
      super(props);
      this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect = (url) => {
    this.props.history.push(url);
  }

  render() {
    return (
      <div style={{marginLeft:"40vh",marginRight:"40vh", marginTop:"20vw"}}>
          <div className="pt-card pt-elevation-0 pt-interactive"
              onClick={() => this.handleRedirect('/patient')}
              style={{textAlign:"center",margin:"15px", minWidth:"200px"}}>
            <Icon iconName="user" style={{padding:"10px"}}/>
            <h5>Patient Portal</h5>
          </div>

          <div className="pt-card pt-elevation-0 pt-interactive"
            onClick={() => this.handleRedirect('/doctor')}
            style={{textAlign:"center",margin:"15px", minWidth:"200px"}}>
            <Icon iconName="prescription" style={{padding:"10px"}} />
            <h5>Doctor Portal</h5>
          </div>

          <div className="pt-card pt-elevation-0 pt-interactive"
            onClick={() => this.handleRedirect('/register')}
            style={{textAlign:"center",margin:"15px", minWidth:"200px"}}>
            <Icon iconName="pt-icon-new-person" style={{padding:"10px"}} />
            <h5>Registration</h5>
          </div>

      </div>
    );
  }
}

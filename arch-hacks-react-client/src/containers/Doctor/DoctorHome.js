import React, { Component } from "react";
import invokeApi from "../../libs/awsLib";

export default class DoctorHome extends Component {
  constructor(props) {
      super(props);

      this.state = {
        users:[],
        isLoading:true,
      };
  }

  componentDidMount(){
    invokeApi("/getPatients","GET").then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error.');
      })
      .then(searchResultsJSON => {
        console.log(searchResultsJSON);
        this.setState({users: searchResultsJSON, isLoading:false});
      })
      .catch(err => {
        console.log('No search results', err);
        this.setState({});
      });

  }




  handleRedirect = (url) => {
    this.props.history.push(url);
  }

  renderPatient(o){
    return(
      <div className="pt-card pt-elevation-0 pt-interactive"
        onClick={() => this.handleRedirect('/doctor/'+o.username)}
        style={{margin:"20px"}}>
        <h5>{o.username}</h5>
        <p>View this patient's most recent appointment was on 10/29/2017</p>
      </div>
    );
  }


  render() {
    return (
      <div>
        <nav className="pt-navbar .modifier">
          <div className="pt-navbar-group pt-align-left">
            <div className="pt-navbar-heading">Doctor Portal</div>
          </div>
          <div className="pt-navbar-group pt-align-right">
            <button className="pt-button pt-minimal pt-icon-home"
              onClick={() => this.handleRedirect('/doctor')}>Home</button>
          </div>
        </nav>

        <div class="docs-card-example">

          {this.state.isLoading ?

            <div class="pt-spinner pt-large pt-align-center" style={{position: "absolute", left: "50%", top: "40vh"}}>
              <div class="pt-spinner-svg-container">
                <svg viewBox="0 0 100 100">
                  <path class="pt-spinner-track" d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"></path>
                  <path class="pt-spinner-head" d="M 94.5 50 A 44.5 44.5 0 0 0 50 5.5"></path>
                </svg>
              </div>
            </div>

            :
            this.state.users.map((i)=>
              this.renderPatient(i))
          }



        </div>

      </div>
    );
  }
}

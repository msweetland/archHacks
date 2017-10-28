import React, { Component } from "react";
//import "./Home.css";
import Login from "../Login";

import LineChart from 'react-linechart';
import '../../../node_modules/react-linechart/dist/styles.css';

export default class PatientHome extends Component {

  constructor(props) {
      super(props);
      this.state = {loggedIn:false, };

      this.handleLoggedIn = this.handleLoggedIn.bind(this);
  }

  handleLoggedIn = (e) => {
    this.setState({loggedIn:!this.state.loggedIn});
  }



  render() {
    const data = [
            {
                color: "black",
                points: [{x: 1, y: 2}, {x: 3, y: 5}, {x: 7, y: -3}]
            }
        ];

    return (
      <div>
        {this.state.loggedIn ?
          <div>
            <LineChart
                        width={600}
                        height={400}
                        data={data}
                    />





          </div> :
          <Login usertype="patient" handleLoggedIn={this.handleLoggedIn}/>
        }
      </div>
    );
  }
}

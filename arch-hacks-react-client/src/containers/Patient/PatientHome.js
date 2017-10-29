import React, { Component } from "react";
//import "./Home.css";
import Login from "../Login";

import LineChart from 'react-linechart';
import '../../../node_modules/react-linechart/dist/styles.css';

import Myo from "myo";
import AWS from "aws-sdk";

let kinesis = new AWS.Kinesis({
  region : 'us-east-1',
  accessKeyId: 'AKIAIBVXFZHLUNXC46EQ',
  secretAccessKey: '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',

});

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


export default class PatientHome extends Component {

  constructor(props) {
      super(props);
      this.state = {
        loggedIn:false,
        xval: 123,
        xprev: 0,
        yval: 435,
        yprev: 0,
        zval: 555,
        zprev: 0,
        magchange: 0,
        ready: 0,
      };

      this.handleLoggedIn = this.handleLoggedIn.bind(this);
      this.myoBand= this.myoBand.bind(this);
      this.putRecord=this.putRecord.bind(this);
      this.startStream=this.startStream.bind(this);
    //this.createNewStream=this.createNewStream.bind(this);
    //this.deleteOldStream=this.deleteOldStream.bind(this);
    //this.setupStream = this.setupStream.bind(this);
  }

  componentWillMount(){
    Myo.connect('');
    //console.log("poop");
  }

  putRecord = () => {
    console.log(this.state.magchange);
    let params = {
      Data: String(this.state.magchange),
      PartitionKey: 'asshat', /* required */
      StreamName: 'PDstream', /* required */
    };
    kinesis.putRecord(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else;// {console.log(data['SequenceNumber'])};           // successful response
    });
  }

  myoBand = () => {
    //com.stolksdorf.myAwesomeApp
    if(this.state.ready) {
      let myoData = [];
      Myo.on('accelerometer', function(data){
        //console.log(data['x']);
        myoData = data;
        //console.log(myoData)
      });
      sleep(100).then(() => {
        let d = new Date();
        console.log(d.getTime());
        if((d.getTime() - this.state.start) > 30000) {
          this.setState({ready: 0});
        }
        let magchange = Math.sqrt(Math.pow(this.state.xval - this.state.xprev, 2)+Math.pow(this.state.yval - this.state.yprev, 2)+Math.pow(this.state.zval - this.state.zprev, 2));
        this.setState({
          xval: myoData['x'],
          xprev: this.state.xval,
          yval: myoData['y'],
          yprev: this.state.yval,
          zval: myoData['z'],
          zprev: this.state.zval,
          magchange: magchange,
        });
      });
    }
  }//.bind(this);

  startStream = () => {
    console.log(this.state.ready);
    this.setState({ready: 1});
    console.log(this.state.ready);
    let d = new Date();
    this.setState({start:d.getTime()});
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

    this.myoBand();
    this.putRecord();
    return (
      <div>
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
        <div className="accelerometer">
          <header className="App-header">
            <h1 className="App-title">Welcome Griffin!</h1>
          </header>
          <p>x: {this.state.xval}</p>
          <p>y: {this.state.yval}</p>
          <p>z: {this.state.zval}</p>
          <button type="button" onClick={()=>this.startStream()}>begin appointment</button>

        </div>
      </div>
    );
  }
}

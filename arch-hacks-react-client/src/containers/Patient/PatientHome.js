import React, { Component } from "react";
import {Sparklines, SparklinesCurve, SparklinesLine, UpdatingSparkline} from "react-sparklines";
import * as d3 from "d3";
import logo from './myoband2.png';
//import {Sparkline} from "d3-react-sparkline";
//import "./Home.css";
import Login from "../Login";
import invokeApi from "../../libs/awsLib.js"

import '../../../node_modules/react-linechart/dist/styles.css';
import './PatientHome.css';

import Myo from "myo";
import AWS from "aws-sdk";
var LineChart = require('react-d3-basic').LineChart;

let Chart = require('react-d3-core').Chart;
let acc = 'AKIAJ4NBFNE26ESMGPOQ';
let sec = 'suwXUAsBZUR9YZHMj1RIvbxdNF3aaSwnFnq0CkkR';

let dynamodb = new AWS.DynamoDB({
  region : 'us-east-1',
  accessKeyId: acc,
  secretAccessKey: sec,
});

let kinesis = new AWS.Kinesis({
  region : 'us-east-1',
  accessKeyId: acc,
  secretAccessKey: sec,

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
        total: [],
        average: 0,
        shwo: 0,
        totalEMG: [],
      };

      this.handleLoggedIn = this.handleLoggedIn.bind(this);
      this.myoBandAcc= this.myoBandAcc.bind(this);
      this.putRecord=this.putRecord.bind(this);
      this.startStream=this.startStream.bind(this);
    //this.createNewStream=this.createNewStream.bind(this);
    //this.deleteOldStream=this.deleteOldStream.bind(this);
    //this.setupStream = this.setupStream.bind(this);
  }

  componentDidMount() {
    setInterval(() => this.forceUpdate(), 1000);
  }

  componentWillMount(){
    Myo.connect('');
    //Myo.streamEMG(true);

    //console.log("poop");
  }

  putRecord = () => {
    //console.log(this.state.magchange);
    let params = {
      Data: String(this.state.magchange),
      PartitionKey: 'asshat', /* required */
      StreamName: 'PDstream', /* required */
    };
    /*kinesis.putRecord(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else;// {console.log(data['SequenceNumber'])};           // successful response
    });*/
  }

  myoBandAcc = () => {
    //com.stolksdorf.myAwesomeApp
    if(this.state.ready) {
      let myoData = [];
      Myo.on('accelerometer', function(data){
        //console.log(data['x']);
        myoData = data;
        //console.log(myoData)
      });
      sleep(120).then(() => {
        let d = new Date();
        //console.log(d.getTime());
        if((d.getTime() - this.state.start) > 10000) {
          //let sum = 0;
          //for(let i = 0; i<this.state.total.length; i++){sum = sum + this.state.total[i];}
          //this.setState({average: sum/this.state.total.length});
          this.setState({ready: 0,});
          //console.log(this.state.total);
          let avgEmg = []
          for(let i = 0; i<this.state.total.length; i++){avgEmg = avgEmg.concat([(this.state.total[i]*100)%3]);}
          //console.log(avgEmg);
          let payload = {"name":"Michael Sweetland", "data":[this.state.total, avgEmg]};
          invokeApi('/sendData', "POST", payload);
        }
        let magchange = Math.sqrt(Math.pow(this.state.xval - this.state.xprev, 2)+Math.pow(this.state.yval - this.state.yprev, 2)+Math.pow(this.state.zval - this.state.zprev, 2));
        if(magchange > 5){magchange = this.state.magchange;console.log('caught');}
        else if(magchange <0.000001){magchange = 0.020020202;console.log('caught');}
        this.setState({
          xval: myoData['x'],
          xprev: this.state.xval,
          yval: myoData['y'],
          yprev: this.state.yval,
          zval: myoData['z'],
          zprev: this.state.zval,
          magchange: magchange,
          total: this.state.total.concat([magchange]),
          totalEMG: this.state.totalEMG.concat([(magchange*100)%3]),
        });

      });
    }
  }//.bind(this);

  myoBandEMG = () => {
    console.log("looging for emg");
    //com.stolksdorf.myAwesomeApp
    if(this.state.running) {
      let myoData = [];
      Myo.on('emg', function(data){
        //console.log(data['x']);
        myoData = data;
        //console.log(myoData)
      });
      sleep(100).then(() => {
        //console.log(myoData);
      });
    }
  }//.bind(this);

  startStream = () => {
    console.log(this.state.ready);
    this.setState({ready: 1, show:1, total:[], totalEMG:[]});
    console.log(this.state.ready);
    let d = new Date();
    this.setState({start:d.getTime()});
  }

  handleLoggedIn = (e) => {
    this.setState({loggedIn:!this.state.loggedIn});
  }



  render() {

    this.myoBandAcc();
    this.putRecord();


    var chartData = this.state.total;
    // your date format, use for parsing
    var parseDate = d3.time.format("%YM%m").parse;

    var width = 500,
      height = 300,
      margins = {left: 100, right: 100, top: 50, bottom: 50},
      // chart series,
      // field: is what field your data want to be selected
      // name: the name of the field that display in legend
      // color: what color is the line
      chartSeries = [
        {
          field: 'total',
          name: 'Total',
          color: '#ff7f0e'
        }
      ],
      // your x accessor
      x = function(d) {
        return parseDate(d.month);
      },
      xScale = 'time';

    return (
      <div>
        <div className="logo-header">
          <img id="app-logo" src={logo} alt="logo" />
        </div>
        <div className="welcome">
          <header className="App-header">

            <h1 className="App-title">Welcome, Michael</h1>
          </header>
          <button type="button" onClick={()=>this.startStream()}>Click to begin appointment</button>
        </div>
        { this.state.show ?
          <div className="data-all">
            <div className="data-numbers">
              <p>X: {this.state.xval}</p>
              <p>Y: {this.state.yval}</p>
              <p>Z: {this.state.zval}</p>
              <p>Average EMG: {100 * this.state.magchange}</p>
            </div>
            <div className="data-graph">
              <Sparklines data={this.state.total} max={1}  width={100} height={15} margin={5}>
                <SparklinesCurve color="blue" />
              </Sparklines>
              <Sparklines data={this.state.totalEMG} max={4}  width={100} height={15} margin={5}>
                <SparklinesCurve color="grey" />
              </Sparklines>
            </div>
            {this.state.ready ?
            <div className="data-running">
              Testing...
            </div>
            :
            <div className="data-normalized">
              Complete!
            </div>
            }
          </div>
          :
          <div></div>
        }

      </div>
    );
  }
}

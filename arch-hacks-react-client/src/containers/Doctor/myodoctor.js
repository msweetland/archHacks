import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

//import Myo from './myo.js';
import Myo from "myo";
import AWS from "aws-sdk";

let kinesis = new AWS.Kinesis({
  region : 'us-east-1',
  accessKeyId: 'AKIAIHUIN4UJFSRPWQJQ',
  secretAccessKey: '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',

});



//Myo.connect('butt', require('ws'));
//console.log("poop");

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xval: 0,
      yval: 0,
      zval: 0,
      shardit: null,
      ready: 0,
    };

    this.getRecords=this.getRecords.bind(this);
    this.getShardIterator=this.getShardIterator.bind(this);
    this.startStream=this.startStream.bind(this);
    this.stopStream=this.stopStream.bind(this);
    //this.createNewStream=this.createNewStream.bind(this);
    //this.deleteOldStream=this.deleteOldStream.bind(this);
    //this.setupStream = this.setupStream.bind(this);
  }


  getShardIterator = () => {
    let getshard = new Promise((resolve, reject) => {
      let params = {
        ShardId: 'shardId-000000000000', /* required */
        ShardIteratorType:'LATEST',
        //ShardIteratorType: 'AT_SEQUENCE_NUMBER',
        //StartingSequenceNumber: '49578359706170421106690562507349118040948646128815964162',
        StreamName: 'PDstream', /* required */
      };
      kinesis.getShardIterator(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
          console.log("Got shard iterator");
          resolve(data['ShardIterator']);
        }
      });
    });

    getshard.then((shardit) => {
      // successMessage is whatever we passed in the resolve(...) function above.
      // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
      this.setState({shardit:shardit});
      //console.log(shardit);
      //console.log(this.state.shardit);
    });
  }
  /*let x = [];
  for(let i = 0; i < data['Records'].length; i++) {
    let y = []
    for(let j = 0; j < data['Records'][i]['Data'].length; j++){
      y[j] = String.fromCharCode(data['Records'][i]['Data'][j]);
    }
    x[i] = y;
  }*/
  getRecords = () => {
    //console.log("getting records");
    if(this.state.ready == 1) {
      //console.log("you clicked me!");
      //console.log(this.state.shardit);
      let params = {
        ShardIterator: this.state.shardit,
        Limit: 30
      };
      //let nextshard = null;
      let nextshard = null;
      kinesis.getRecords(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     {
          //console.log(data);
          if(data['Records'].length){
            console.log('length is:',data['Records'].length);
            for(let k = 0; k<data['Records'].length; k++) {
              //console.log(data['Records'][k]['SequenceNumber']);
            }
            let x = data['Records'][0]['Data'];
            let array = []
            for(let i=0;i<x.length;i++) { array[i] = String.fromCharCode(x[i]); }
            console.log(parseFloat(array.join('')))
            //console.log(x)
          }
          else {console.log("no data gotten");}
          nextshard = data['NextShardIterator'];
        }           // successful response
      });
      sleep(1000).then(() => {
        if(nextshard != null) {
          this.setState({shardit:nextshard});
          //console.log("SETTING SHARDIT:", this.state.shardit);
        }
        else {
          console.log("nextshard was null!");
        }
      });
    }
  }

  startStream = () => {
    this.setState({ready:1});
    console.log("SETTING ready!:", this.state.ready);
  }

  stopStream = () => {
    this.setState({ready:0});
    console.log("SETTING ready!:", this.state.ready);
  }





  render() {
    //console.log(this.state.shardit);
    this.getRecords();
    return (
      <div className="doctor">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hello Doctor</h1>
        </header>
        <p>x: {this.state.xval}</p>
        <p>y: {this.state.yval}</p>
        <p>z: {this.state.zval}</p>
        <button type="button" onClick={()=>this.getShardIterator()}>assign iterator</button>
        <button type="button" onClick={()=>this.getRecords()}>get records</button>
        <button type="button" onClick={()=>this.startStream()}>start streaming</button>
        <button type="button" onClick={()=>this.stopStream()}>stop records</button>
      </div>
    );
  }
}

export default withRouter(Doctor);

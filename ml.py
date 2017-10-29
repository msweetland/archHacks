from __future__ import print_function

import json

import boto3


def lambda_handler(event, context): 
 r=json.dumps(event)
 g=json.loads(r)
 q=g['value']
 def predict(q):  
  client = boto3.client('machinelearning')
  response = client.predict(
  MLModelId='ml-s9yh5J3GX0V',
  Record={
    'var02' : q
        
    },
  PredictEndpoint='https://realtime.machinelearning.us-east-1.amazonaws.com'
    )
  plabel=response['Prediction']['predictedLabel']
  j=response['Prediction']['predictedScores']
  r=j[u'0']
  if plabel=='0':
        return ("prediction Score:"+str(r)+','+ "Normal EMG value, Patient is not Parkinson's")
  elif plabel=='1':
        return ("prediction Score:"+str(r)+','+ "Abnormal EMG value , Patient is Parkinson's")
  return predict(q)

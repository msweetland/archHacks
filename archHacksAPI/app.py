# Python Dependencies
# ===================
import json
import re
import os
from base64 import decodestring

# Chalice and AWS
# ===============
from chalice import *
import boto3
from boto3.dynamodb.conditions import Key, Attr

app = Chalice(app_name='archHacksAPI')
app.debug = True

#rekognitionPatient = "archhacksPatient"
#rekognitionDoctor = "archhacksDoctor"
#rekognition = boto3.client('rekognition')
dynamodb = boto3.resource('dynamodb')


# Create Patient
# ==============
# status: works
# {name:""}

@app.route('/register',methods=['POST'],content_types=['application/json'], cors=True)
def register():
	event = json.loads(app.current_request.raw_body)
	username = event["name"]

	table = dynamodb.Table("patient")
	items = table.query(
		KeyConditionExpression=Key('username').eq(username)
	)[u"Items"]

	if items == []:
		table.put_item(
		Item={
			"username": username,
			"appt": 0,
			"data": [0]	
			}
		)
		return {"Success":True}
	else:
		return {"Success":False}



# Add Data
# ========
# status: works
# {name:"", data: ""}

@app.route('/sendData',methods=['POST'],content_types=['application/json'], cors=True)
def sendData():
	event = json.loads(app.current_request.raw_body)
	username = event["name"]

	table = dynamodb.Table("patient")
	items = table.query(
		KeyConditionExpression=Key('username').eq(username)
	)[u"Items"]


	if items != []:
		lastApt = 0
		for dic in items:
			if dic["appt"] > lastApt: lastApt = dic["appt"]
		lastApt += 1
		table.put_item(
		Item={
			"username": username,
			"appt": lastApt,
			"accelerometer":[str(n) for n in event["data"][0]],
			"emg":[str(n) for n in event["data"][1]]
			}
		)

		return {"Success":True}

	return {"Success":False}



# Get Patients
# ============
# status: works

@app.route('/getPatients',methods=['GET'],content_types=['application/json'], cors=True)
def getPatients():
	table = dynamodb.Table("patient")
	return table.scan()["Items"]


# Get Patient
# ===========
# status: works
# {name:"", data: ""}
@app.route('/getPatient',methods=['POST'],content_types=['application/json'], cors=True)
def getPatient():
	event = json.loads(app.current_request.raw_body)
	username = event["name"]

	table = dynamodb.Table("patient")
	return table.query(
		KeyConditionExpression=Key('username').eq(username)
	)[u"Items"]









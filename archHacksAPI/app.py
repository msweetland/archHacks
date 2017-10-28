# Python Dependencies
# ===================
import json
import re
import base64

# Chalice and AWS
# ===============
from chalice import *
import boto3
from boto3.dynamodb.conditions import Key, Attr

app = Chalice(app_name='archHacksAPI')
app.debug = True

rekognitionPatient = "archhacksPatient"
rekognitionDoctor = "archhacksDoctor"
rekognition = boto3.client('rekognition')
dynamodb = boto3.resource('dynamodb')


# Register User
# =============
# Receives
#	{name:"", userType: "patient", image : "base64", byteImage: bytes}

@app.route('/register',methods=['POST'],content_types=['application/json'], cors=True)
def register():
	event = json.loads(app.current_request.raw_body)

	name = event['name']
	userType = event['usertype']
	img = bytearray(base64.b64decode(str(re.sub('^data:image/.+;base64,', '', event['image']))))


	if userType == "patient":
		rekognitionCollection = rekognitionPatient
	else:
		rekognitionCollection = rekognitionDoctor

	faceID = rekognition.index_faces(
		CollectionId=rekognitionCollection,
		Image={
			'Bytes': bytearray(img)
			},
	)#["FaceRecords"][0]["Face"]["FaceId"]

	return faceID

	faceID = "test"

	table = dynamodb.Table(userType)
	table.put_item(
		Item={
			"faceID": str(faceID),
			"Name": str(name),
			"Image": str(event['image']),	
			}
	)
	
	return {"Success":True}


# Identify User
# =============
# Receives
#	{name:"", isDoctor: "patient", image : "base64"}

@app.route('/identify',methods=['POST'],content_types=['application/json'], cors=True)
def identify():
	event = json.loads(app.current_request.raw_body)

	name = event['name']
	userType = event['usertype']
	image = re.sub('^data:image/.+;base64,', '', event['image'])

	if userType == "patient":
		rekognitionCollection = rekognitionPatient
	else:
		rekognitionCollection = rekognitionDoctor

	response = rekognition.search_faces_by_image(
		CollectionId=rekognitionCollection,
		Image={
			'Bytes': bytearray(image.decode('base64'))
			},
		MaxFaces=1,
		FaceMatchThreshold=65
	)

	if len(response['FaceMatches']) == 0:
		return False

	faceID = response['FaceMatches'][0]['Face']['FaceId']

	table = dynamodb.Table(userType)
	response = table.query(
		IndexName='faceID',
		KeyConditionExpression=Key('faceID').eq(faceID)
	)

	return name






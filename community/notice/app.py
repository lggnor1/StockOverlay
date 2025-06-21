import pyrebase
import json

with open('/auth.json') as f:
    config = json.load(f)

firebase = pyrebase.initialize_app(config)
db = firebase.database()

data = {"password":1234, "name":"giseong lee"}
db.child("User").child("temp123").update(data)
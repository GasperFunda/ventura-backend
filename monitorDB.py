import time
import pymongo
from dotenv import load_dotenv
import os
from predictSign import predictSign
from bson.json_util import loads,dumps
import numpy as np
import cv2
import base64
while True:
    load_dotenv()
    DB_USERNAME = os.getenv("DB_USERNAME")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    connectionString = "mongodb+srv://"+ DB_USERNAME +":"+ DB_PASSWORD +"@ventura.2ym7e.mongodb.net/Ventura?retryWrites=true&w=majority"
    myclient = pymongo.MongoClient(connectionString)
    mydb = myclient["Ventura"]
    mytable = mydb["trafficsigns"]

    query = {"type": "not set"}

    results = mytable.find(query)
    
    for x in results:
        json_str = dumps(x)
        res = loads(json_str)
        myquery = {"_id": res["_id"]}
        newvalues = {"$set": {"type":"in progress"}}
        mytable.update_one(myquery,newvalues)
        
        imgdata = np.frombuffer(base64.b64decode(res["image"]),np.uint8)
        img = cv2.imdecode(imgdata,cv2.IMREAD_COLOR)

        print(img)
        type = predictSign(img)
        print(type)
        myquery = {"_id": res["_id"]}
        newvalues = {"$set": {"type":type}}

        mytable.update_one(myquery,newvalues)
    time.sleep(20.0)
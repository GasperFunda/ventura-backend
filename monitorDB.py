import time
import pymongo
from dotenv import load_dotenv
import os
from predictSign import predictSign
from bson.json_util import loads,dumps
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
        type = predictSign(res["path"])
        print(type)
        myquery = {"_id": res["_id"]}
        newvalues = {"$set": {"type":type}}

        mytable.update_one(myquery,newvalues)
    time.sleep(10.0)
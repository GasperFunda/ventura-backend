import numpy as np
import serial
import time
import pymongo
import os
import atexit

from dotenv import load_dotenv
from bson.json_util import loads,dumps

SERIAL_PORT = 'COM3'
SERIAL_RATE = 115200

load_dotenv()
DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
connectionString = "mongodb+srv://"+ DB_USERNAME +":"+ DB_PASSWORD +"@ventura.2ym7e.mongodb.net/Ventura?retryWrites=true&w=majority"
myclient = pymongo.MongoClient(connectionString)
mydb = myclient["Ventura"]
mytable = mydb["compasses"]

def data_read(ser):
    counter = 0
    while True:
        ser.read_all() # clear buffer so we only read the latest line
        line = ser.readline()
        line = line[:-1]
        json_line = loads(line)
        data = {"counter": counter, "yaw": json_line["yaw"]}
        print(data)
        mytable.insert_one(data)
        counter += 1
        time.sleep(0.125)


def on_exit_handler():
    mytable.delete_many({})
    myclient.close()
    print("exiting")

atexit.register(on_exit_handler)
# open serial port
ser = []
try:
    print("Opening port:", SERIAL_PORT)
    ser = serial.Serial(SERIAL_PORT, SERIAL_RATE)
    data_read(ser)
except serial.SerialException:
    print("Culd not open serial port!")
    exit

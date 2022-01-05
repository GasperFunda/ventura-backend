import numpy as np
import serial
import time

SERIAL_PORT = 'COM3'
SERIAL_RATE = 115200

def data_read(q,ser):
    ser.read_all()



# open serial port
ser = []
try:
    print("Opening port:", SERIAL_PORT)
    ser = serial.Serial(SERIAL_PORT, SERIAL_RATE)
except serial.SerialException:
    print("Culd not open serial port!")
    exit

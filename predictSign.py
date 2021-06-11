import cv2
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow import keras
from skimage import io
from tensorflow.python.keras import layers
from keras import layers,datasets,models
import os
import glob
def resize_cv(im):
    return cv2.resize(im, (32, 32), interpolation = cv2.INTER_LINEAR)

def predictSign(img):
    model = models.load_model("imageClassifier.model")
    class_names = ["Speed limit - 20","Speed limit - 30", "Speed limit - 50", "Speed limit - 60","Speed limit - 70","Speed limit - 80","Stop speed limit - 80","Speed limit - 100", "Speed limit - 120","No overtaking","No truck overtaking","Crossroad","Priority road","Non priority road","Stop","Forbidden traffic","Forbidden for trucks","Forbidden direction","Danger","Turn left","Turn right","Wiggly road","Speedbumps","Slippery road","Road narrowing","Work on the road","Semaphore","Pedestrian warning","Kids warning","Bicycle warning","Snow warning","Animal warning","No speed limit","Must turn right","Must turn left","Must go straight","Must go straight or right","Must go straight or left","Must drive here right","Must drive here left","Roundabout","Overtaking allowed","Truck overtaking allowed","Bicycle"]
    img = cv2.cvtColor(img,cv2.COLOR_RGB2BGR)
    img = resize_cv(img)

    prediction = model.predict(np.array([img]))

    index = np.argmax(prediction)

    return class_names[index]

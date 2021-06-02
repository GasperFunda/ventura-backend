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

def predictSign(img_path):
    model = models.load_model("imageClassifier.model")
    class_names = ["Bicycle","Stop"]
    img = io.imread(img_path)

    img = resize_cv(img)

    prediction = model.predict(np.array([img]))

    index = np.argmax(prediction)

    return class_names[index]

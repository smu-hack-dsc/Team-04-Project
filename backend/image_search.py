import os
from dotenv import load_dotenv
import tensorflow as tf
import tensorflow_hub as hub
from PIL import Image
import numpy as np
import pinecone

model_url = "https://tfhub.dev/tensorflow/efficientnet/lite0/feature-vector/2"

IMAGE_SHAPE = (224, 224)

layer = hub.KerasLayer(model_url, input_shape=IMAGE_SHAPE+(3,))
model = tf.keras.Sequential([layer])

load_dotenv()

def initialise_pinecone():
    api_key = os.getenv("PINECONE_API_KEY")
    environment = os.get("PINECONE_ENV")
    return pinecone.init(api_key=api_key, environment=environment)


def extract(file):
    # Open file and convert image to correct size for current model
    file = Image.open(file).convert('L').resize(IMAGE_SHAPE)
    # Convert to RGB representation for each pixel
    file = np.stack((file,)*3, axis=-1)
    # Normalise each value to between 0 and 1. (RGB values are from 0 - 254)
    file = np.array(file)/255.0

    embedding = model.predict(file[np.newaxis, ...])
    # Array of 1280 elements - A.K.A 1280 dimensions
    embedding_np = np.array(embedding)
    flattened_feature = embedding_np.flatten().tolist()

    return flattened_feature


def insert_pinecone(indexName, file, key):
    initialise_pinecone()
    vectorList = extract(file)
    index= pinecone.Index(indexName)
    index.upsert([
        (key, vectorList)
    ])


def insert_pinecone_with_filter(indexName, file, key, filter):
    initialise_pinecone()
    vectorList = extract(file)
    index= pinecone.Index(indexName)
    index.upsert([
        (key, vectorList, filter)
    ])


def query(indexName, file, maxReturn):
    initialise_pinecone()
    vectorToCompare = extract(file)
    index= pinecone.Index(indexName)
    return index.query(vector = vectorToCompare, top_k = maxReturn)


def query_with_filter(indexName, file, maxReturn, filterJson):
    initialise_pinecone()
    vectorToCompare = extract(file)
    index= pinecone.Index(indexName)
    return index.query(vector = vectorToCompare, top_k = maxReturn, filter = filterJson)
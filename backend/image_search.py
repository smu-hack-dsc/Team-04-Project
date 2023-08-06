import os
from dotenv import load_dotenv
import tensorflow as tf
import tensorflow_hub as hub
from PIL import Image
import numpy as np
import pinecone
from pathlib import Path
import json
import psycopg2
from db_config import get_db_connection
from os.path import isfile, join, isdir
from os import listdir

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

def create_product_postgresql(product_dict):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                brand = product_dict["brand"]
                size = product_dict["size"]
                colour = product_dict["colour"]
                price = product_dict["price"]
                type = product_dict["type"]
                image_url = product_dict["image_url"]
                date_added = product_dict["date_added"]
                product_name = product_dict["product_name"]
                category = product_dict["category"]
                gender = product_dict["gender"]

                cursor.execute('INSERT INTO tothecloset."address" ' "(brand, size, colour, price, type, image_url, date_added, product_name, category, gender) " "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING product_id", (brand, size, colour, price, type, image_url, date_added, product_name, category, gender))

                new_product_id = cursor.fetchone()[0]

                if new_product_id is not None:
                    connection.commit()
                    return new_product_id
                else:
                    return 0

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return 0
    
    
def process_json_and_image(subdirectory_path):
    # Get a list of files in the subdirectory
    files = listdir(subdirectory_path)
    
    # Find the JSON file in the subdirectory
    json_file = next((f for f in files if f.endswith('.json')), None)
    
    if json_file:
        json_path = join(subdirectory_path, json_file)
        # Read and process the JSON file
        with open(json_path, 'r') as json_file:
            json_data = json.load(json_file)
            
            product_id = create_product_postgresql(json_data)
            print(product_id)
            
            if (product_id !=0):
                # Find the image file (webp, jpg, png) in the subdirectory
                image_file = next((f for f in files if f.endswith('.webp') or f.endswith('.jpg') or f.endswith('.png')), None)
                print(image_file)
                
                if image_file:
                    image_path = join(subdirectory_path, image_file)
                    # Perform your actions with the image file
            
            
                

def bulk_insertion(directory_path):
    # Get a list of subdirectories (folders) in the specified directory
    subdirectories = [f for f in listdir(directory_path) if isdir(join(directory_path, f)) and f.isdigit()]

    # Sort the subdirectories based on their numeric names
    sorted_subdirectories = sorted(subdirectories, key=lambda x: int(x))

    # Process each subdirectory (folder)
    for subdirectory in sorted_subdirectories:
        subdirectory_path = join(directory_path, subdirectory)
        process_json_and_image(subdirectory_path)

# Call the bulk_insertion function with the directory path
bulk_insertion("C:\\Users\\ASUS\\Documents\\School\\Others\\.Hack\\HEAP 2023\\SampleInsertionFolder")


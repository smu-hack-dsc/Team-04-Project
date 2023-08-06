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
from flask import jsonify, request
import uuid

model_url = "https://tfhub.dev/tensorflow/efficientnet/lite0/feature-vector/2"

IMAGE_SHAPE = (224, 224)

layer = hub.KerasLayer(model_url, input_shape=IMAGE_SHAPE+(3,))
model = tf.keras.Sequential([layer])

load_dotenv()

def initialise_pinecone():
    api_key = os.getenv("PINECONE_API_KEY")
    environment = os.getenv("PINECONE_ENV")
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


def insert_pinecone(file, key):
    res = initialise_pinecone()
    vectorList = extract(file)
    index = pinecone.Index("clothes")
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


def query(file):
    initialise_pinecone()
    vectorToCompare = extract(file)
    index= pinecone.Index("clothes")
    return index.query(vector = vectorToCompare, top_k = 5)


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
                

                cursor.execute('INSERT INTO tothecloset."product" ' "(brand, size, colour, price, type, image_url, date_added, product_name, category, gender) " "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING product_id", (brand, size, colour, price, type, image_url, date_added, product_name, category, gender))

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
            product_id = str(product_id)
            
            if (product_id !=0):
                # Find the image file (webp, jpg, png) in the subdirectory
                image_file = next((f for f in files if f.endswith('.webp') or f.endswith('.jpg') or f.endswith('.png')), None)
                
                if image_file:
                    image_path = join(subdirectory_path, image_file)
                    insert_pinecone(image_path, product_id);
                    return 1
            else:
                return 0
                

def bulk_insertion():
    
    directory_path = request.args.get("parent_folder_path")
    
    # Get a list of subdirectories (folders) in the specified directory
    subdirectories = [f for f in listdir(directory_path) if isdir(join(directory_path, f)) and f.isdigit()]

    # Sort the subdirectories based on their numeric names
    sorted_subdirectories = sorted(subdirectories, key=lambda x: int(x))

    # Process each subdirectory (folder)
    for subdirectory in sorted_subdirectories:
        subdirectory_path = join(directory_path, subdirectory)
        response = process_json_and_image(subdirectory_path)
        if response == 0:
            return jsonify({"error": "Failed to insert products"}), 500
        
    return jsonify({"message": "Inserted products successfully"}), 200

# C:\\Users\\ASUS\\Documents\\School\\Others\\.Hack\\HEAP 2023\\SampleInsertionFolder

def generate_random_filename(original_filename):
    # Generate a random UUID and use it as the filename's prefix
    random_prefix = str(uuid.uuid4())
    _, file_extension = os.path.splitext(original_filename)
    random_filename = random_prefix + file_extension
    return random_filename

def delete_file(file_path):
    try:
        os.remove(file_path)
        print(f"File '{file_path}' has been deleted successfully.")
    except OSError as e:
        print(f"Error deleting file '{file_path}': {e}")

def image_query():
    try:
        uploaded_file = request.files['file']

        if uploaded_file:
            # Specify the path to save the uploaded file
            random_filename = generate_random_filename(uploaded_file.filename)
            file_path = f'./TempImageFiles/{random_filename}'
            uploaded_file.save(file_path)
            
            # send query to pinecone
            response = query(file_path)
            matches = response["matches"]
            
            # get list of ids
            id_list = []
            for match in matches:
                id_list.append(match["id"])

            return jsonify(id_list), 200
        else:
            return jsonify({"message": "No image file uploaded"}), 400
        
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
    finally:
        delete_file(file_path)


from flask import jsonify
from dotenv import load_dotenv
import os
import psycopg2

load_dotenv()

# get db connection
def get_db_connection():
    db_host = os.getenv("DB_HOST")
    db_port = os.getenv("DB_PORT")
    db_name = os.getenv("DB_NAME")
    db_user = os.getenv("DB_USER")
    db_password = os.getenv("DB_PASSWORD")

    return psycopg2.connect(host=db_host, port=db_port, dbname=db_name, user=db_user, password=db_password)

def check_connection():
    try:
        with get_db_connection() as connection:
            return "PostgreSQL connection successful"
    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500
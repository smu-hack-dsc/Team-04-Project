from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os
import psycopg2

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

def get_db_connection():
    db_host = os.getenv("DB_HOST")
    db_port = os.getenv("DB_PORT")
    db_name = os.getenv("DB_NAME")
    db_user = os.getenv("DB_USER")
    db_password = os.getenv("DB_PASSWORD")

    return psycopg2.connect(
        host=db_host,
        port=db_port,
        dbname=db_name,
        user=db_user,
        password=db_password
    )
    
# to check connection
@app.route('/api/check_connection')
def check_connection():
    try:
        with get_db_connection() as connection:
            return 'PostgreSQL connection successful'
    except (Exception, psycopg2.Error) as error:
        return jsonify({'error': str(error)}), 500

@app.route('/api/address', methods=['GET'])
def get_address():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."address"')
                rows = cursor.fetchall()
                addresses = [{'id': row[0], 'street': row[1], 'city': row[2]} for row in rows]

        return rows

    except (Exception, psycopg2.Error) as error:
        return jsonify({'error': str(error)}), 500

# @app.route('/api/users', methods=['POST'])
# def create_user():
#     try:
#         data = request.get_json()
#         name = data.get('name')

#         with get_db_connection() as connection:
#             with connection.cursor() as cursor:
#                 cursor.execute('INSERT INTO users (name) VALUES (%s) RETURNING id', (name,))
#                 new_user_id = cursor.fetchone()[0]
#                 connection.commit()

#         return jsonify({'id': new_user_id, 'name': name}), 201

#     except (Exception, psycopg2.Error) as error:
#         return jsonify({'error': str(error)}), 500

if __name__ == '__main__':
    app.run()

from flask import jsonify, request
import json
import os
import psycopg2
from db_config import get_db_connection
import bcrypt
import jwt
from dotenv import load_dotenv

load_dotenv()


def get_user(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."user" WHERE user_id = %s', (user_id,))
                row = cursor.fetchall()

                if len(row) == 0:
                    return jsonify({"error": "No user found for user_id: " + str(user_id)}), 404

                user = {
                    "user_id": row[0][0],
                    "first_name": row[0][1],
                    "last_name": row[0][2],
                    "email": row[0][3],
                    "phone_num": row[0][4],
                    "password": row[0][5],
                }

        return jsonify(user), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500

def create_user():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                first_name = request.args.get("first_name")
                last_name = request.args.get("last_name")
                email = request.args.get("email")
                phone_num = request.args.get("phone_num")
                plaintext_password = request.args.get("password")

                # Hash the password using bcrypt
                salt = bcrypt.gensalt()
                hashed_password = bcrypt.hashpw(plaintext_password.encode(), salt)

                cursor.execute(
                    'INSERT INTO tothecloset."user" '
                    "(first_name, last_name, email, phone_num, password) "
                    "VALUES (%s, %s, %s, %s, %s) RETURNING user_id",
                    (first_name, last_name, email, phone_num, hashed_password.decode())
                )

                user_id = cursor.fetchone()[0]

                if user_id is not None:
                    connection.commit()

                    # Generate a JWT token
                    secret_key = os.getenv("SECRET_KEY")
                    print("secretkey:",secret_key)
                    payload = {
                        "user_id": user_id,
                        "first_name": first_name,
                        "last_name": last_name,
                        "email": email,
                        "phone_num": phone_num
                    }
                    print("payload",payload)
                    token = jwt.encode(payload, secret_key, algorithm="HS256")
                    print("token:",token)
                    return jsonify({"message": "User inserted successfully", "user_id": user_id, "token": token}), 201
                else:
                    return jsonify({"error": "Failed to insert user"}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500
    
def get_user_from_email(email):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."user" WHERE email = %s', (email,))
                row = cursor.fetchall()

                if len(row) == 0:
                    return None

                user = {
                    "user_id": row[0][0],
                    "first_name": row[0][1],
                    "last_name": row[0][2],
                    "email": row[0][3],
                    "phone_num": row[0][4],
                    "password": row[0][5],
                }

        return user

    except (Exception, psycopg2.Error) as error:
        return None

def check_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Find the user with the provided email in the database
    user_details = get_user_from_email(email)

    print(user_details)  # Add this line to check the user_details value in the console

    if user_details:
        hashed_password = user_details["password"]
        if not bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
            return jsonify({'error': 'Invalid email or password'}), 401
        # If the password matches, generate an authentication token (e.g., JWT)
        secret_key = os.getenv("SECRET_KEY")
        payload = {
            "user_id": user_details["user_id"],
            "email": user_details["email"],
            "first_name": user_details["first_name"],
            "last_name": user_details["last_name"],
            # Add more fields as needed
        }
        token = jwt.encode(payload, secret_key, algorithm="HS256")

        return jsonify({'message': 'Login successful', 'token': token}), 200

    else:
        return jsonify({'error': 'Invalid email or password'}), 401


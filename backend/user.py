from flask import jsonify, request
import os
import psycopg2
from db_config import get_db_connection

def get_user(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."address"' "WHERE user_id = %s", (user_id))

                row = cursor.fetchall()

                if len(row) == 0:
                    return jsonify("No user found: " + user_id), 404

                user = {
                    "user_id": row[0],
                    "first_name": row[1],
                    "last_name": row[2],
                    "email": row[3],
                    "phone_num": row[4],
                    "password": row[5],
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
                password = request.args.get("password")
                print(first_name)

                cursor.execute('INSERT INTO tothecloset."user" ' "(first_name, last_name, email, phone_num, password) " "VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING user_id", (first_name, last_name, email, phone_num, password))

                user_id = cursor.fetchone()[0]
                print(user_id)

                if user_id is not None:
                    connection.commit()
                    return jsonify({"message": "User inserted successfully", "user_id": user_id}), 201
                else:
                    return jsonify({"error": "Failed to insert user"}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500
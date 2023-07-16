from flask import jsonify, request
import os
import psycopg2
from app import get_db_connection

def get_clothing_preference_from_user_id(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."clothing_preference"' "WHERE user_id = %s", (user_id))

                row = cursor.fetchone()[0]

                if len(row) == 0:
                    return jsonify("No clothing preference found under user_id: " + user_id), 404

                clothing_preference = {
                    "user_id": row[0],
                    "height": row[1],
                    "weight": row[2],
                    "top_fit": row[3],
                    "bottom_fit": row[4],
                    "shoulder_width": row[5],
                    "hip": row[6],
                    "waist": row[7],
                }

        return jsonify(clothing_preference), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500

def create_clothing_preference():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                user_id = request.args.get("user_id")
                height = request.args.get("height")
                weight = request.args.get("weight")
                top_fit = request.args.get("top_fit")
                bottom_fit = request.args.get("bottom_fit")
                shoulder_width = request.args.get("shoulder_width")
                hip = request.args.get("hip")
                waist = request.args.get("waist")

                cursor.execute('INSERT INTO tothecloset."clothing_preference" ' "(user_id, height, weight, top_fit, bottom_fit, shoulder_width, hip, waist) " "VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING user_id", (user_id, height, weight, top_fit, bottom_fit, shoulder_width, hip, waist))

                user_id = cursor.fetchone()[0]

                if user_id is not None:
                    connection.commit()
                    return jsonify({"message": "Clothing_preference inserted successfully", "user_id": user_id}), 201
                else:
                    return jsonify({"error": "Failed to insert clothing preference"}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500
    
def update_clothing_preference(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                height = request.args.get("height")
                weight = request.args.get("weight")
                top_fit = request.args.get("top_fit")
                shoulder_width = request.args.get("bottom_fit")
                bottom_fit = request.args.get("shoulder_width")
                hip = request.args.get("hip")
                waist = request.args.get("waist")

                rows_affected = cursor.execute('UPDATE tothecloset."clothing_preference" SET ' "height = %s, weight = %s, top_fit = %s, bottom_fit = %s, shoulder_width = %s, hip = %s, waist = %s WHERE user_id = %s", (height, weight, top_fit, bottom_fit, shoulder_width, hip, waist, user_id))

                if rows_affected == 0:
                    return jsonify({"error": "Clothing preference not found for user: " + user_id}), 404

        connection.commit()

        return jsonify({"message": "Clothing preference updated successfully"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500
    
def delete_clothing_preference(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                rows_affected = cursor.execute('DELETE FROM tothecloset."clothing_preference" WHERE user_id = %s', (user_id))

            if rows_affected == 0:
                connection.rollback()
                return jsonify({"error": "Clothing preference not found"}), 404

        connection.commit()

        return jsonify({"message": "Clothing preference deleted successfully"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500
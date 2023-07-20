from flask import jsonify, request
import os
import psycopg2
from app import get_db_connection

def get_rental_from_user_id(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."rental"' "WHERE user_id = %s", (user_id))

                rows = cursor.fetchall()

                if len(rows) == 0:
                    return jsonify("No rentals found under user_id: " + user_id), 404

                rentals = [{"rental_id": row[0], "user_id": row[1], "product_id": row[2], "rental_start": row[3], "rental_end": row[4], "rental_period": row[5], "transaction_id": row[6], "delivery_id": row[7], "return_id": row[8], "is_ongoing": row[9]} for row in rows]

        return jsonify(rentals), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500
    
def create_rental():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                user_id = request.args.get("user_id")
                product_id = request.args.get("product_id")
                rental_start = request.args.get("rental_start")
                rental_end = request.args.get("rental_end")
                rental_period = request.args.get("rental_period")
                transaction_id = request.args.get("transaction_id")
                delivery_id = request.args.get("delivery_id")
                return_id = request.args.get("return_id")
                is_ongoing = request.args.get("is_ongoing")

                cursor.execute('INSERT INTO tothecloset."address" ' "(user_id, product_id, rental_start, rental_end, rental_period, transaction_id, delivery_id, return_id, is_ongoing) " "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING rental_id", (user_id, product_id, rental_start, rental_end, rental_period, transaction_id, delivery_id, return_id, is_ongoing))

                new_rental_id = cursor.fetchone()[0]

                if new_rental_id is not None:
                    connection.commit()
                    return jsonify({"message": "Rental inserted successfully", "rental_id": new_rental_id}), 201
                else:
                    return jsonify({"error": "Failed to insert rental"}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500

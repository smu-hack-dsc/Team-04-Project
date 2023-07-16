from flask import jsonify, request
import os
import psycopg2
from app import get_db_connection

def get_wishlist_from_user_id(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT product_id FROM tothecloset."wishlist" WHERE user_id = %s', (user_id,))
                rows = cursor.fetchall()

                if len(rows) == 0:
                    return jsonify({"message": "No wishlist items found for user_id: " + user_id}), 404

                product_ids = [row[0] for row in rows]

        return jsonify({"product_ids": product_ids}), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500
    
def create_wishlist():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                user_id = request.args.get("user_id")
                product_id = request.args.get("product_id")

                rows_affected = cursor.execute('INSERT INTO tothecloset."wishlist" ' "(user_id, product_id) " "VALUES (%s, %s)", (user_id, product_id))

                if rows_affected == 0:
                    return jsonify({"error": "Failed to insert product into wishlist"}), 500

        connection.commit()

        return jsonify({"message": "Product inserted successfully into wishlist"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500
    
def delete_product_from_wishlist(user_id, product_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                rows_affected = cursor.execute('DELETE FROM tothecloset."wishlist" WHERE user_id = %s AND product_id = %s', (user_id, product_id))

            if rows_affected == 0:
                connection.rollback()
                return jsonify({"error": "Product not found in wishlist"}), 404

        connection.commit()

        return jsonify({"message": "Product deleted successfully from wishlist"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500

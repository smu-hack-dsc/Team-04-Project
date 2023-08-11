from flask import jsonify, request
import os
import psycopg2
from db_config import get_db_connection

def get_deliveries():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."delivery"')
                rows = cursor.fetchall()

                if len(rows) == 0:
                    return jsonify("No deliveries found"), 404

                deliveries = [{"delivery_id": row[0], "address_id": row[1], "delivery_date": row[2], "delivery_status": row[3], "user_id": row[4]} for row in rows]

        return jsonify(deliveries), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500
    
def get_delivery_from_user_id(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."delivery" WHERE user_id = %s', (user_id,))

                rows = cursor.fetchall()

                if len(rows) == 0:
                    return jsonify("No deliveries found under user_id: " + user_id), 404

                deliveries = [{"delivery_id": row[0], "address_id": row[1], "delivery_date": row[2], "delivery_status": row[3], "user_id": row[4]} for row in rows]

        return jsonify(deliveries), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500
    
def get_delivery_from_delivery_id(delivery_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."delivery" WHERE delivery_id = %s', (delivery_id,))

                row = cursor.fetchone()

                if row is None:
                    return jsonify({"error": "Delivery not found"}), 404

                delivery = {
                    "delivery_id": row[0],
                    "address_id": row[1],
                    "delivery_date": row[2],
                    "delivery_status": row[3],
                    "user_id": row[4]
                }

        return jsonify(delivery), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500
        
def create_delivery():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                data = request.json  # Get the JSON data from the request body

                address_id = data.get("address_id")
                delivery_date = data.get("delivery_date")
                delivery_status = data.get("delivery_status")
                user_id = data.get("user_id")

                cursor.execute(
                    'INSERT INTO tothecloset."delivery" '
                    "(address_id, delivery_date, delivery_status, user_id) "
                    "VALUES (%s, %s, %s, %s) RETURNING delivery_id",
                    (address_id, delivery_date, delivery_status, user_id)
                )

                new_delivery_id = cursor.fetchone()[0]

                if new_delivery_id is not None:
                    connection.commit()
                    return jsonify({
                        "message": "Delivery inserted successfully",
                        "delivery_id": new_delivery_id
                    }), 201
                else:
                    return jsonify({"error": "Failed to insert delivery"}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500

def update_delivery(delivery_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                address_id = request.args.get("address_id")
                delivery_date = request.args.get("delivery_date")
                delivery_status = request.args.get("delivery_status")
                user_id = request.args.get("user_id")

                rows_affected = cursor.execute('UPDATE tothecloset."delivery" SET ' "address_id = %s, delivery_date = %s, delivery_status = %s, user_id = %s WHERE delivery_id = %s", (address_id, delivery_date, delivery_status, user_id, delivery_id))

                if rows_affected == 0 or rows_affected == None:
                    return jsonify({"error": "Delivery not found"}), 404

        connection.commit()

        return jsonify({"message": "Delivery updated successfully"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500

def delete_delivery(delivery_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                rows_affected = cursor.execute('DELETE FROM tothecloset."delivery" WHERE delivery_id = %s', (delivery_id))

            if rows_affected == 0 or rows_affected == None:
                connection.rollback()
                return jsonify({"error": "Delivery not found"}), 404

        connection.commit()

        return jsonify({"message": "Delivery deleted successfully"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500
from flask import jsonify, request
import os
import psycopg2
from db_config import get_db_connection

def get_product_availability_from_product_id(product_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."product_availability"' "WHERE product_id = %s", (product_id))

                rows = cursor.fetchall()

                if len(rows) == 0:
                    return jsonify("No product availability found under product_id: " + product_id), 404

                product_availabilities = [{"date": row[0], "is_booked": row[1]} for row in rows]

        return jsonify(product_availabilities), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500
    
def update_product_availability(product_id, date):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                is_booked = request.args.get("is_booked")

                rows_affected = cursor.execute('UPDATE tothecloset."product_availability" SET ' "is_boooked = %s WHERE product_id = %s AND date = %s", (is_booked, product_id, date))

                if rows_affected == 0:
                    return jsonify({"error": "Product availability not found"}), 404

        connection.commit()

        return jsonify({"message": "Product availability updated successfully"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500
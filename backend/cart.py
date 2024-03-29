from flask import jsonify, request
import os
import psycopg2
from db_config import get_db_connection
from datetime import datetime, timedelta

def get_cart_from_user_id(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."cart" WHERE user_id = %s', (user_id,))

                rows = cursor.fetchall()

                if len(rows) == 0:
                    return jsonify("No products found under user_id: " + user_id), 404

                products = [{"product_id": row[0], "user_id": row[1], "rental_start": row[2], "rental_end": row[3], "rental_period": row[4], "quantity": row[5]} for row in rows]

        return jsonify(products), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500
    
def create_product_in_cart():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                data = request.json  # Parse JSON data from the request body

                product_id = data.get("product_id")
                user_id = data.get("user_id")
                rental_start = data.get("rental_start")
                rental_period = data.get("rental_period")
                quantity = data.get("quantity")

                # Check if the product is already booked by another user on the selected days
                cursor.execute(
                    'SELECT COUNT(*) FROM tothecloset."cart" '
                    'WHERE product_id = %s AND rental_start = %s AND rental_period = %s',
                    (product_id, rental_start, rental_period)
                )
                count = cursor.fetchone()[0]
                if count > 0:
                    return jsonify({"error_code": 4091, "error_message": "Product is already booked on the selected days"}), 409

                # Check if the product is already booked by another user on any day within the selected period
                end_date = datetime.strptime(rental_start, '%Y-%m-%d').date() + timedelta(days=rental_period - 1)
                cursor.execute(
                    'SELECT COUNT(*) FROM tothecloset."cart" '
                    'WHERE product_id = %s AND rental_start <= %s AND rental_start + rental_period - 1 >= %s',
                    (product_id, rental_start, end_date)
                )
                count = cursor.fetchone()[0]
                if count > 0:
                    return jsonify({"error_code": 4092, "error_message": "Product is already booked for some days within the selected period"}), 409

                cursor.execute(
                    'INSERT INTO tothecloset."cart" '
                    '(product_id, user_id, rental_start, rental_period, quantity) '
                    'VALUES (%s, %s, %s, %s, %s) '
                    'RETURNING product_id, user_id',
                    (product_id, user_id, rental_start, rental_period, quantity)
                )

                return_values = cursor.fetchone()

                if return_values is not None:
                    connection.commit()
                    return jsonify(
                        {
                            "message": "Product inserted into cart successfully",
                            "product_id": return_values[0],
                            "user_id": return_values[1],
                        }
                    ), 201
                else:
                    return jsonify({"error_code": 5001, "error_message": "Failed to insert product in cart"}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error_code": 500, "error_message": str(error)}), 500

    

def update_cart(user_id, product_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                rental_start = request.args.get("rental_start")
                rental_end = request.args.get("rental_end")
                rental_period = request.args.get("rental_period")
                quantity = request.args.get("quantity")

                rows_affected = cursor.execute('UPDATE tothecloset."cart" SET ' "rental_start = %s, rental_end = %s, " "rental_period = %s, quantity = %s" "WHERE user_id = %s AND product_id = %s", (rental_start, rental_end, rental_period, quantity, user_id, product_id))

                if rows_affected == 0 or rows_affected == None:
                    return jsonify({"error": "Product not found in this user's cart"}), 404

        connection.commit()

        return jsonify({"message": "Product updated successfully"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500
    
def delete_product_in_cart(user_id, product_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                rows_affected = cursor.execute('DELETE FROM tothecloset."cart" WHERE user_id = %s AND product_id = %s', (user_id, product_id))
                
            # if rows_affected == 0 or rows_affected == None:
            #     connection.rollback()
            #     return jsonify({"error": "Product not found in user's cart"}), 404

        connection.commit()

        return jsonify({"message": "Product deleted successfully from user's cart"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500
    
def update_quantity(user_id, product_id, quantity):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:

                rows_affected = cursor.execute('UPDATE tothecloset."cart" SET quantity = %s WHERE user_id = %s AND product_id = %s', 
                (quantity, user_id, product_id))

                # if rows_affected == 0 or rows_affected == None:
                #     return jsonify({"error": "Product not found in this user's cart"}), 404

        connection.commit()

        return jsonify({"message": "Product quantity updated successfully"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500
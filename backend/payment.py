from flask import jsonify, request
import os
import psycopg2
from app import get_db_connection

def get_payments():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."payment"')
                rows = cursor.fetchall()

                if len(rows) == 0:
                    return jsonify("No payments found"), 404

                payments = [
                    {
                        "payment_id": row[0],
                        "user_id": row[1],
                        "cardholder_name": row[2],
                        "card_number": row[3],
                        "cvc": row[4],
                        "expiry_year": row[5],
                        "expiry_month": row[6],
                        "is_default": row[7]
                    }
                    for row in rows
                ]

        return jsonify(payments), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500
    
def get_payment_from_user_id(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."payment"' "WHERE user_id = %s", (user_id))

                rows = cursor.fetchall()

                if len(rows) == 0:
                    return jsonify("No payments found under user_id: " + user_id), 404

                payments = [
                    {
                        "payment_id": row[0],
                        "user_id": row[1],
                        "cardholder_name": row[2],
                        "card_number": row[3],
                        "cvc": row[4],
                        "expiry_year": row[5],
                        "expiry_month": row[6],
                        "is_default": row[7]
                    }
                    for row in rows
                ]

        return jsonify(payments), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500
    
def create_payment():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                user_id = request.args.get("user_id")
                cardholder_name = request.args.get("cardholder_name")
                card_number = request.args.get("card_number")
                cvc = request.args.get("cvc")
                expiry_year = request.args.get("expiry_year")
                expiry_month = request.args.get("expiry_month")
                is_default = request.args.get("is_default")

                cursor.execute('INSERT INTO tothecloset."payment" ' "(user_id, cardholder_name, card_number, cvc, expiry_year, expiry_month, is_default) " "VALUES (%s, %s, %s, %s, %s, %s) RETURNING payment_id", (user_id, cardholder_name, card_number, cvc, expiry_year, expiry_month, is_default))

                new_payment_id = cursor.fetchone()[0]

                if new_payment_id is not None:
                    connection.commit()
                    return jsonify({"message": "Payment inserted successfully", "payment_id": new_payment_id}), 201
                else:
                    return jsonify({"error": "Failed to insert payment"}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500
    
def update_payment(payment_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                user_id = request.args.get("user_id")
                cardholder_name = request.args.get("cardholder_name")
                card_number = request.args.get("card_number")
                cvc = request.args.get("cvc")
                expiry_year = request.args.get("expiry_year")
                expiry_month = request.args.get("expiry_month")
                is_default = request.args.get("is_default")

                rows_affected = cursor.execute('UPDATE tothecloset."payment" SET user_id = %s, cardholder_name = %s, card_number = %s, cvc = %s, expiry_year = %s, expiry_month = %s, is_default=%s WHERE payment_id = %s', (user_id, cardholder_name, card_number, cvc, expiry_year, expiry_month, is_default, payment_id))

                if rows_affected == 0:
                    return jsonify({"error": "Payment not found"}), 404

        connection.commit()

        return jsonify({"message": "Payment updated successfully"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500

def delete_payment(payment_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                rows_affected = cursor.execute('DELETE FROM tothecloset."payment" WHERE payment_id = %s', (payment_id))

            if rows_affected == 0:
                connection.rollback()
                return jsonify({"error": "Payment not found"}), 404

        connection.commit()

        return jsonify({"message": "Payment deleted successfully"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500


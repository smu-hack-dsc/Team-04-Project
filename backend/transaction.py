from flask import jsonify, request
import os
import psycopg2
from app import get_db_connection

def create_transaction():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                
                transaction_date = request.args.get("transaction_date")
                user_id = request.args.get("user_id")
                payment_method = request.args.get("payment_method")
                payment_amount = request.args.get("payment_amount")
                payment_id = request.args.get("payment_id")

                cursor.execute('INSERT INTO tothecloset."transaction" ' "(transaction_date, user_id, payment_method, payment_amount, payment_id) " "VALUES (%s, %s, %s, %s, %s) RETURNING transaction_id", (user_id, transaction_date, payment_id, payment_method, payment_amount))

                new_transaction_id = cursor.fetchone()[0]

                if new_transaction_id is not None:
                    connection.commit()
                    return jsonify({"message": "Transaction inserted successfully", "transaction_id": new_transaction_id}), 201
                else:
                    return jsonify({"error": "Failed to insert transaction"}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500
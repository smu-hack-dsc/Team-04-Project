from flask import jsonify, request
import os
import psycopg2
from db_config import get_db_connection

def create_transaction():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                
                data = request.json  # Parse JSON data from the request body

                transaction_date = data.get("transaction_date")
                user_id = data.get("user_id")
                payment_method = data.get("payment_method")
                payment_amount = data.get("payment_amount")
                payment_id = data.get("payment_id")

                print("Values received:")
                print("transaction_date:", transaction_date)
                print("user_id:", user_id)
                print("payment_method:", payment_method)
                print("payment_amount:", payment_amount)
                print("payment_id:", payment_id)

                cursor.execute(
                'INSERT INTO tothecloset."transaction" ' +
                '(transaction_date, user_id, payment_method, payment_amount, payment_id) ' +
                'VALUES (%s, %s, %s, %s, %s) RETURNING transaction_id',
                [transaction_date, user_id, payment_method, payment_amount, payment_id]
                )

                new_transaction_id = cursor.fetchone()[0]

                if new_transaction_id is not None:
                    connection.commit()
                    return jsonify({"message": "Transaction inserted successfully", "transaction_id": new_transaction_id}), 201
                else:
                    return jsonify({"error": "Failed to insert transaction"}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500
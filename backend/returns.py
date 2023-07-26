from flask import jsonify, request
import os
import psycopg2
from db_config import get_db_connection

def get_return_from_user_id(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."return"' "WHERE user_id = %s", (user_id))

                rows = cursor.fetchall()

                if len(rows) == 0:
                    return jsonify("No return found under user_id: " + user_id), 404

                returns = [{"return_id": row[0], "user_id": row[1], "return_date": row[2], "confirmation_date": row[3], "is_late": row[4], "product_id": row[5]} for row in rows]

        return jsonify(returns), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500
    
def create_return():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                user_id = request.args.get("user_id")
                return_date = request.args.get("return_date")
                confirmation_date = request.args.get("confirmation_date")
                is_late = request.args.get("is_late")
                product_id = request.args.get("product_id")

                cursor.execute('INSERT INTO tothecloset."return" ' "(user_id, return_date, confirmation_date, is_late, product_id) " "VALUES (%s, %s, %s, %s, %s) RETURNING return_id", (user_id, return_date, confirmation_date, is_late, product_id))

                new_return_id = cursor.fetchone()[0]

                if new_return_id is not None:
                    connection.commit()
                    return jsonify({"message": "Return inserted successfully", "return_id": new_return_id}), 201
                else:
                    return jsonify({"error": "Failed to insert return"}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500
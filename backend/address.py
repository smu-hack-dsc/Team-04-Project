from flask import jsonify, request
import os
import psycopg2
from app import get_db_connection

def get_addresses():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."address"')
                rows = cursor.fetchall()

                if len(rows) == 0:
                    return jsonify("No addresses found"), 404

                addresses = [{"address_id": row[0], "user_id": row[1], "address_num": row[2], "address_1": row[3], "address_2": row[4], "city": row[5], "state": row[6], "postal_code": row[7], "is_billing_address": row[8]} for row in rows]

        return jsonify(addresses), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500

def get_address_from_user_id(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."address"' "WHERE user_id = %s", (user_id))

                rows = cursor.fetchall()

                if len(rows) == 0:
                    return jsonify("No addresses found under user_id: " + user_id), 404

                addresses = [{"address_id": row[0], "user_id": row[1], "address_num": row[2], "address_1": row[3], "address_2": row[4], "city": row[5], "state": row[6], "postal_code": row[7], "is_billing_address": row[8]} for row in rows]

        return jsonify(addresses), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500

def create_address():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                user_id = request.args.get("user_id")
                address_num = request.args.get("address_num")
                address_1 = request.args.get("address_1")
                address_2 = request.args.get("address_2")
                city = request.args.get("city")
                state = request.args.get("state")
                postal_code = request.args.get("postal_code")
                is_billing_address = request.args.get("is_billing_address")

                cursor.execute('INSERT INTO tothecloset."address" ' "(user_id, address_num, address_1, address_2, city, state, postal_code, is_billing_address) " "VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING address_id", (user_id, address_num, address_1, address_2, city, state, postal_code, is_billing_address))

                new_address_id = cursor.fetchone()[0]

                if new_address_id is not None:
                    connection.commit()
                    return jsonify({"message": "Address inserted successfully", "address_id": new_address_id}), 201
                else:
                    return jsonify({"error": "Failed to insert address"}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500
    
def update_address(user_id, address_num):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                address_1 = request.args.get("address_1")
                address_2 = request.args.get("address_2")
                city = request.args.get("city")
                state = request.args.get("state")
                postal_code = request.args.get("postal_code")
                is_billing_address = request.args.get("is_billing_address")

                rows_affected = cursor.execute('UPDATE tothecloset."address" SET ' "address_1 = %s, address_2 = %s, " "city = %s, state = %s, postal_code = %s, " "is_billing_address = %s WHERE user_id = %s AND address_num = %s", (address_1, address_2, city, state, postal_code, is_billing_address, user_id, address_num))

                if rows_affected == 0:
                    return jsonify({"error": "Address not found"}), 404

        connection.commit()

        return jsonify({"message": "Address updated successfully"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500
    
def delete_address(user_id, address_num):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                rows_affected = cursor.execute('DELETE FROM tothecloset."address" WHERE user_id = %s AND address_num = %s', (user_id, address_num))

            if rows_affected == 0:
                connection.rollback()
                return jsonify({"error": "Address not found"}), 404

        connection.commit()

        return jsonify({"message": "Address deleted successfully"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500
from flask import jsonify, request
import base64
import requests
import os
import psycopg2
from db_config import get_db_connection
import paypalrestsdk
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

CLIENT_ID = os.environ.get("PAYPAL_CLIENTID")
APP_SECRET = os.environ.get("PAYPAL_SECRET")
base = "https://api-m.sandbox.paypal.com" 

paypalrestsdk.configure({
    "mode": "sandbox",  # Use "live" for production
    "client_id": CLIENT_ID,
    "client_secret": APP_SECRET,
})

def create_order():
    access_token = "A21AALStztWrAQETVYRQXG4Ylg7tBRnhdOXW_flZye0P0U5RtZd8OXvrotx6EQMOkERMEL_jXNZjnyflqjza9qBJ9Oc0lu3Dg"
    url = f"{base}/v2/checkout/orders"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}",
    }
    payload = {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount": {
                    "currency_code": "USD",
                    "value": "110.0",
                    "breakdown": {
                        "item_total": {"currency_code": "USD", "value": "100.00"},
                        "tax_total": {"currency_code": "USD", "value": "10.00"}
                    }
                },
                "items": [
                    {
                        "name": "wiersze",
                        "tax": {"currency_code": "USD", "value": "10.00"},
                        "quantity": "1",
                        "unit_amount": {"currency_code": "USD", "value": "100.00"}
                    }
                ]
            }
        ],
    }
    
    response = requests.post(url, json=payload, headers=headers)
    return handle_response(response)

def capture_paypal_payment(order_id):
    access_token = generate_access_token()
    url = f"{base}/v2/checkout/orders/{order_id}/capture"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {access_token}",
    }
    response = requests.post(url, headers=headers)
    return handle_response(response)

def generate_access_token():
    auth = base64.b64encode(f"{CLIENT_ID}:{APP_SECRET}".encode()).decode()
    url = f"{base}/v1/oauth2/token"
    headers = {
        "Authorization": f"Basic {auth}",
    }
    payload = {
        "grant_type": "client_credentials",
    }
    response = requests.post(url, headers=headers, data=payload)
    json_data = handle_response(response)
    return json_data["access_token"]

def handle_response(response):
    if response.status_code in [200, 201]:
        return response.json()
    raise Exception(response.text)

# def create_paypal_order():
#     data = request.json
#     total_amount = data.get("totalAmount")
#     currency = "SGD"  # Change this to your desired currency code

#     # Create a PayPal order
#     order = paypalrestsdk.Order({
#         "intent": "CAPTURE",
#         "purchase_units": [{
#             "amount": {
#                 "currency_code": currency,
#                 "value": total_amount,
#             }
#         }]
#     })

#     if order.create():
#         return jsonify({"orderId": order.id}), 200
#     else:
#         return jsonify({"error": order.error}), 400


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
                # Parse the JSON data from the request body
                payment_data = request.get_json()

                # Print the received payment data (for debugging)
                print("Received payment data:", payment_data)

                # Extract data from the payment_data dictionary
                user_id = payment_data.get("user_id")
                cardholder_name = payment_data.get("cardholder_name")
                card_number = payment_data.get("card_number")
                cvc = payment_data.get("cvc")
                expiry_year = payment_data.get("expiry_year")
                expiry_month = payment_data.get("expiry_month")
                is_default = payment_data.get("is_default")

                # Convert the necessary fields to the correct data types
                user_id = int(user_id)
                card_number = int(card_number)
                cvc = int(cvc)
                expiry_year = int(expiry_year)
                expiry_month = int(expiry_month)
                is_default = bool(is_default)

                # Insert the payment data into the database
                cursor.execute(
                    'INSERT INTO tothecloset."payment" '
                    '(user_id, cardholder_name, card_number, cvc, expiry_year, expiry_month, is_default) '
                    'VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING payment_id',
                    (user_id, cardholder_name, card_number, cvc, expiry_year, expiry_month, is_default)
                )

                new_payment_id = cursor.fetchone()[0]
                payment_data = {
                    "payment_id": new_payment_id,
                    "user_id": user_id,
                    "cardholder_name": cardholder_name,
                    "card_number": card_number,
                    "cvc": cvc,
                    "expiry_year": expiry_year,
                    "expiry_month": expiry_month,
                    "is_default": is_default
                }

                if new_payment_id is not None:
                    return jsonify({"message": "Payment inserted successfully", "payment_id": new_payment_id, "payment_data": payment_data}), 201
                else:
                    return jsonify({"error": "Failed to insert payment"}), 500

    except psycopg2.OperationalError as error:
        return jsonify({"error": "Could not connect to the database"}), 500
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

                if rows_affected == 0 or rows_affected == None:
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

            if rows_affected == 0 or rows_affected == None:
                connection.rollback()
                return jsonify({"error": "Payment not found"}), 404

        connection.commit()

        return jsonify({"message": "Payment deleted successfully"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500


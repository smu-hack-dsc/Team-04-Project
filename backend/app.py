from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os
import psycopg2
import json
import math

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)


# get db connection
def get_db_connection():
    db_host = os.getenv("DB_HOST")
    db_port = os.getenv("DB_PORT")
    db_name = os.getenv("DB_NAME")
    db_user = os.getenv("DB_USER")
    db_password = os.getenv("DB_PASSWORD")

    return psycopg2.connect(host=db_host, port=db_port, dbname=db_name, user=db_user, password=db_password)


# to check connection
@app.route("/api/check_connection")
def check_connection():
    try:
        with get_db_connection() as connection:
            return "PostgreSQL connection successful"
    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500


########## DB: address


# get all addresses
@app.route("/api/address", methods=["GET"])
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


# get all address under user id
@app.route("/api/address/<user_id>/", methods=["GET"])
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


# add one address
@app.route("/api/address", methods=["POST"])
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


# update one address
@app.route("/api/address/<user_id>/<address_num>", methods=["PUT"])
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


# delete one address
@app.route("/api/address/<user_id>/<address_num>", methods=["DELETE"])
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


########## DB: cart


# get all products under one user_id
@app.route("/api/cart/<user_id>/", methods=["GET"])
def get_cart_from_user_id(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."cart"' "WHERE user_id = %s", (user_id))

                rows = cursor.fetchall()

                if len(rows) == 0:
                    return jsonify("No products found under user_id: " + user_id), 404

                products = [{"product_id": row[0], "user_id": row[1], "rental_start": row[2], "rental_end": row[3], "rental_period": row[4], "quantity": row[5]} for row in rows]

        return jsonify(products), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500


# add one product in cart
@app.route("/api/cart", methods=["POST"])
def create_product_in_cart():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                product_id = request.args.get("product_id")
                user_id = request.args.get("user_id")
                rental_start = request.args.get("rental_start")
                rental_end = request.args.get("rental_end")
                rental_period = request.args.get("rental_period")
                quantity = request.args.get("quantity")

                cursor.execute('INSERT INTO tothecloset."cart" ' "(product_id, user_id, rental_start, rental_end, rental_period, quantity) " "VALUES (%s, %s, %s, %s, %s, %s) RETURNING product_id, user_id", (product_id, user_id, rental_start, rental_end, rental_period, quantity))

                return_values = cursor.fetchall()

                if return_values is not None:
                    connection.commit()
                    return jsonify({"message": "Product inserted into cart successfully", "product_id": return_values[0], "user_id": return_values[1]}), 201
                else:
                    return jsonify({"error": "Failed to insert product in cart"}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500


# update one product in cart
@app.route("/api/cart/<user_id>/<product_id>", methods=["PUT"])
def update_cart(user_id, product_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                rental_start = request.args.get("rental_start")
                rental_end = request.args.get("rental_end")
                rental_period = request.args.get("rental_period")
                quantity = request.args.get("quantity")

                rows_affected = cursor.execute('UPDATE tothecloset."cart" SET ' "rental_start = %s, rental_end = %s, " "rental_period = %s, quantity = %s" "WHERE user_id = %s AND product_id = %s", (rental_start, rental_end, rental_period, quantity, user_id, product_id))

                if rows_affected == 0:
                    return jsonify({"error": "Product not found in this user's cart"}), 404

        connection.commit()

        return jsonify({"message": "Product updated successfully"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500


# delete one product in user's cart
@app.route("/api/cart/<user_id>/<product_id>", methods=["DELETE"])
def delete_product_in_cart(user_id, product_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                rows_affected = cursor.execute('DELETE FROM tothecloset."cart" WHERE user_id = %s AND product_id = %s', (user_id, product_id))

            if rows_affected == 0:
                connection.rollback()
                return jsonify({"error": "Product not found in user's cart"}), 404

        connection.commit()

        return jsonify({"message": "Product deleted successfully from user's cart"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500


########## DB: clothing_preferences


# get clothing preference for user_id
@app.route("/api/clothing_preference/<user_id>/", methods=["GET"])
def get_clothing_preference_from_user_id(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."clothing_preference"' "WHERE user_id = %s", (user_id))

                row = cursor.fetchone()[0]

                if len(row) == 0:
                    return jsonify("No clothing preference found under user_id: " + user_id), 404

                clothing_preference = {
                    "user_id": row[0],
                    "height": row[1],
                    "weight": row[2],
                    "top_fit": row[3],
                    "bottom_fit": row[4],
                    "shoulder_width": row[5],
                    "hip": row[6],
                    "waist": row[7],
                }

        return jsonify(clothing_preference), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500


# add one clothing preference
@app.route("/api/clothing_preference", methods=["POST"])
def create_clothing_preference():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                user_id = request.args.get("user_id")
                height = request.args.get("height")
                weight = request.args.get("weight")
                top_fit = request.args.get("top_fit")
                bottom_fit = request.args.get("bottom_fit")
                shoulder_width = request.args.get("shoulder_width")
                hip = request.args.get("hip")
                waist = request.args.get("waist")

                cursor.execute('INSERT INTO tothecloset."clothing_preference" ' "(user_id, height, weight, top_fit, bottom_fit, shoulder_width, hip, waist) " "VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING user_id", (user_id, height, weight, top_fit, bottom_fit, shoulder_width, hip, waist))

                user_id = cursor.fetchone()[0]

                if user_id is not None:
                    connection.commit()
                    return jsonify({"message": "Clothing_preference inserted successfully", "user_id": user_id}), 201
                else:
                    return jsonify({"error": "Failed to insert clothing preference"}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500


# update one clothing preference
@app.route("/api/clothing_preference/<user_id>", methods=["PUT"])
def update_clothing_preference(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                height = request.args.get("height")
                weight = request.args.get("weight")
                top_fit = request.args.get("top_fit")
                shoulder_width = request.args.get("bottom_fit")
                bottom_fit = request.args.get("shoulder_width")
                hip = request.args.get("hip")
                waist = request.args.get("waist")

                rows_affected = cursor.execute('UPDATE tothecloset."clothing_preference" SET ' "height = %s, weight = %s, top_fit = %s, bottom_fit = %s, shoulder_width = %s, hip = %s, waist = %s WHERE user_id = %s", (height, weight, top_fit, bottom_fit, shoulder_width, hip, waist, user_id))

                if rows_affected == 0:
                    return jsonify({"error": "Clothing preference not found for user: " + user_id}), 404

        connection.commit()

        return jsonify({"message": "Clothing preference updated successfully"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500


# delete one clothing preference
@app.route("/api/clothing_preference/<user_id>", methods=["DELETE"])
def delete_clothing_preference(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                rows_affected = cursor.execute('DELETE FROM tothecloset."clothing_preference" WHERE user_id = %s', (user_id))

            if rows_affected == 0:
                connection.rollback()
                return jsonify({"error": "Clothing preference not found"}), 404

        connection.commit()

        return jsonify({"message": "Clothing preference deleted successfully"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500


########## DB: delivery


# get all deliveries
@app.route("/api/delivery", methods=["GET"])
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


# get all deliveries under user id
@app.route("/api/delivery/<user_id>/", methods=["GET"])
def get_delivery_from_user_id(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."delivery"' "WHERE user_id = %s", (user_id))

                rows = cursor.fetchall()

                if len(rows) == 0:
                    return jsonify("No deliveries found under user_id: " + user_id), 404

                deliveries = [{"delivery_id": row[0], "address_id": row[1], "delivery_date": row[2], "delivery_status": row[3], "user_id": row[4]}  for row in rows]

        return jsonify(deliveries), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500


# add one delivery
@app.route("/api/delivery", methods=["POST"])
def create_delivery():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                address_id = request.args.get("address_id")
                delivery_date = request.args.get("delivery_date")
                delivery_status = request.args.get("delivery_status")
                user_id = request.args.get("user_id")

                cursor.execute('INSERT INTO tothecloset."delivery" ' "(address_id, delivery_date, delivery_status, user_id) " "VALUES (%s, %s, %s, %s) RETURNING delivery_id", (address_id, delivery_date, delivery_status, user_id))

                new_delivery_id = cursor.fetchone()[0]

                if new_delivery_id is not None:
                    connection.commit()
                    return jsonify({"message": "Delivery inserted successfully", "delivery_id": new_delivery_id}), 201
                else:
                    return jsonify({"error": "Failed to insert delivery"}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500


# update one delivery
@app.route("/api/delivery/<delivery_id>", methods=["PUT"])
def update_delivery(delivery_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                address_id = request.args.get("address_id")
                delivery_date = request.args.get("delivery_date")
                delivery_status = request.args.get("delivery_status")
                user_id = request.args.get("user_id")

                rows_affected = cursor.execute('UPDATE tothecloset."delivery" SET ' "address_id = %s, delivery_date = %s, delivery_status = %s, user_id = %s WHERE delivery_id = %s", (address_id, delivery_date, delivery_status, user_id, delivery_id))

                if rows_affected == 0:
                    return jsonify({"error": "Delivery not found"}), 404

        connection.commit()

        return jsonify({"message": "Delivery updated successfully"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500


# delete one delivery
@app.route("/api/delivery/<delivery_id>", methods=["DELETE"])
def delete_delivery(delivery_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                rows_affected = cursor.execute('DELETE FROM tothecloset."delivery" WHERE delivery_id = %s', (delivery_id))

            if rows_affected == 0:
                connection.rollback()
                return jsonify({"error": "Delivery not found"}), 404

        connection.commit()

        return jsonify({"message": "Delivery deleted successfully"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500


########## DB: payment


# get all payments
@app.route("/api/payment", methods=["GET"])
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


# get all payment under user id
@app.route("/api/payment/<user_id>/", methods=["GET"])
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


# add one payment
@app.route("/api/payment", methods=["POST"])
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


# update one payment
@app.route("/api/payment/<payment_id>", methods=["PUT"])
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


# delete one payment
@app.route("/api/payment/<payment_id>", methods=["DELETE"])
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


########## DB: product


# get all products
@app.route("/api/product", methods=["GET"])
def get_products():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."product"')
                rows = cursor.fetchall()

                if len(rows) == 0:
                    return jsonify("No products found"), 404

                products = [{"product_id": row[0], "brand": row[1], "size": row[2], "colour": row[3], "price": row[4], "type": row[5], "image_url": row[6], "date_added": row[7], "product_name": row[8], "sizing_chart": row[9], "category": row[10]} for row in rows]

        return jsonify(products), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500


# get one product
@app.route("/api/product/<product_id>/", methods=["GET"])
def get_product(product_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."product"' "WHERE product_id = %s", (product_id))

                row = cursor.fetchall()

                if len(row) == 0:
                    return jsonify("No product found: " + product_id), 404

                product = {"product_id": row[0], "brand": row[1], "size": row[2], "colour": row[3], "price": row[4], "type": row[5], "image_url": row[6], "date_added": row[7], "product_name": row[8], "sizing_chart": row[9], "category": row[10]}

        return jsonify(product), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500


# get filtered products with specified brands, colour, price, size, type

# brands - string[]
# colour - string []
# min_price - float ALWAYS PASSED IN
# max_price - float ALWAYS PASSED IN
# size - string[]
# type - string[]

# case sensitive, look at db

@app.route("/api/product/filter", methods=["GET"])
def get_filtered_products():
    try:
        brands = request.args.getlist("brand")
        sizes = request.args.getlist("size")
        colours = request.args.getlist("colour")
        types = request.args.getlist("type")
        price_min = float(request.args.get("price_min", 0))
        price_max = float(request.args.get("price_max", 0))

        sql_query = 'SELECT * FROM tothecloset."product" WHERE 1=1'
        params = []

        if brands:
            sql_query += " AND brand IN %s"
            params.append(tuple(brands))
        if sizes:
            sql_query += " AND size IN %s"
            params.append(tuple(sizes))
        if colours:
            sql_query += " AND colour IN %s"
            params.append(tuple(colours))
        if types:
            sql_query += " AND type IN %s"
            params.append(tuple(types))

        sql_query += " AND price BETWEEN %s AND %s"
        params.append(price_min)
        params.append(price_max)

        print(sql_query)
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(sql_query, params)
                rows = cursor.fetchall()

                if len(rows) == 0:
                    return jsonify({"message": "No products found with the specified filters"}), 404

                products = [{"product_id": row[0], "brand": row[1], "size": row[2], "colour": row[3], "price": row[4], "type": row[5], "image_url": row[6], "date_added": row[7], "product_name": row[8], "sizing_chart": row[9], "category": row[10]} for row in rows]

        return jsonify({"products": products}), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500

# add one product
@app.route("/api/product", methods=["POST"])
def create_product():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:

                brand = request.args.get("brand")
                size = request.args.get("size")
                colour = request.args.get("colour")
                price = request.args.get("price")
                type = request.args.get("type")
                image_url = request.args.get("image_url")
                date_added = request.args.get("date_added")
                product_name = request.args.get("product_name")
                sizing_chart = request.args.get("sizing_chart")
                category = request.args.get("category")

                cursor.execute('INSERT INTO tothecloset."address" ' "(brand, size, colour, price, type, image_url, date_added, product_name, sizing_chart, category) " "VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING product_id", (brand, size, colour, price, type, image_url, date_added, product_name, sizing_chart, category))

                new_product_id = cursor.fetchone()[0]

                if new_product_id is not None:
                    connection.commit()
                    return jsonify({"message": "Product inserted successfully", "product_id": new_product_id}), 201
                else:
                    return jsonify({"error": "Failed to insert product"}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500


# update one product
@app.route("/api/product/<product_id>", methods=["PUT"])
def update_product(product_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                
                brand = request.args.get("brand")
                size = request.args.get("size")
                colour = request.args.get("colour")
                price = request.args.get("price")
                type = request.args.get("type")
                image_url = request.args.get("image_url")
                date_added = request.args.get("date_added")
                product_name = request.args.get("product_name")
                sizing_chart = request.args.get("sizing_chart")
                category = request.args.get("category")

                rows_affected = cursor.execute('UPDATE tothecloset."address" SET brand = %s, size = %s, colour = %s, price = %s, type = %s, image_url = %s" "date_added = %s, product_name = %s, sizing_chart = %s, category =  %s WHERE product_id = %s', (brand, size, colour, price, type, image_url, date_added, product_name, sizing_chart, category, product_id))

                if rows_affected == 0:
                    return jsonify({"error": "Product not found"}), 404

        connection.commit()

        return jsonify({"message": "Product updated successfully"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500


# delete one product
@app.route("/api/product/<product_id>", methods=["DELETE"])
def delete_product(product_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                rows_affected = cursor.execute('DELETE FROM tothecloset."product" WHERE product_id = %s', (product_id))

            if rows_affected == 0:
                connection.rollback()
                return jsonify({"error": "Product not found"}), 404

        connection.commit()

        return jsonify({"message": "Product deleted successfully"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500
    
# get products by type
@app.route("/api/product/<type>", methods=["GET"])
def get_product_by_type(type):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."product"' "WHERE type = %s", (type))

                rows = cursor.fetchall()

                if len(rows) == 0:
                    return jsonify("No prodct found under type: " + type), 404

                products = [{"product_id": row[0], "brand": row[1], "size": row[2], "colour": row[3], "price": row[4], "type": row[5], "image_url": row[6], "date_added": row[7], "product_name": row[8], "sizing_chart": row[9], "category": row[10]} for row in rows]

        return jsonify(products), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500

# sort products by price
@app.route("/api/product/sort", methods=["GET"])
def sort_products_by_price():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                sort_order = request.args.get('order', 'asc')

                if sort_order == 'asc':
                    cursor.execute('SELECT * FROM "product" ORDER BY price ASC')
                else:
                    cursor.execute('SELECT * FROM "product" ORDER BY price DESC')

                rows = cursor.fetchall()

                products = [
                    {
                        "product_id": row[0], "brand": row[1], "size": row[2], "colour": row[3], "price": row[4], "type": row[5], "image_url": row[6], "date_added": row[7], "product_name": row[8], "sizing_chart": row[9], "category": row[10]
                    }
                    for row in rows
                ]

        return jsonify(products), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500


########## DB: product_availability


# get all product availability for product id
@app.route("/api/product_availability/<product_id>/", methods=["GET"])
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


# update one product_availability
@app.route("/api/product_availability/<product_id>/<date>", methods=["PUT"])
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


########## DB: rental


# get all rentals under user id
@app.route("/api/rental/<user_id>/", methods=["GET"])
def get_rental_from_user_id(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."rental"' "WHERE user_id = %s", (user_id))

                rows = cursor.fetchall()

                if len(rows) == 0:
                    return jsonify("No rentals found under user_id: " + user_id), 404

                rentals = [{"rental_id": row[0], "user_id": row[1], "product_id": row[2], "rental_start": row[3], "rental_end": row[4], "rental_period": row[5], "transaction_id": row[6], "delivery_id": row[7], "return_id": row[8], "is_ongoing": row[9]} for row in rows]

        return jsonify(rentals), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500


# add one rental
@app.route("/api/rental", methods=["POST"])
def create_rental():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                user_id = request.args.get("user_id")
                product_id = request.args.get("product_id")
                rental_start = request.args.get("rental_start")
                rental_end = request.args.get("rental_end")
                rental_period = request.args.get("rental_period")
                transaction_id = request.args.get("transaction_id")
                delivery_id = request.args.get("delivery_id")
                return_id = request.args.get("return_id")
                is_ongoing = request.args.get("is_ongoing")

                cursor.execute('INSERT INTO tothecloset."address" ' "(user_id, product_id, rental_start, rental_end, rental_period, transaction_id, delivery_id, return_id, is_ongoing) " "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING rental_id", (user_id, product_id, rental_start, rental_end, rental_period, transaction_id, delivery_id, return_id, is_ongoing))

                new_rental_id = cursor.fetchone()[0]

                if new_rental_id is not None:
                    connection.commit()
                    return jsonify({"message": "Rental inserted successfully", "rental_id": new_rental_id}), 201
                else:
                    return jsonify({"error": "Failed to insert rental"}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500


########## DB: return


# get all return under user id
@app.route("/api/return/<user_id>/", methods=["GET"])
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


# add one return
@app.route("/api/return", methods=["POST"])
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


########## DB: transaction


# add one transaction
@app.route("/api/transaction", methods=["POST"])
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


########## DB: user


# get one user
@app.route("/api/user/<user_id>/", methods=["GET"])
def get_user(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."address"' "WHERE user_id = %s", (user_id))

                row = cursor.fetchall()

                if len(row) == 0:
                    return jsonify("No user found: " + user_id), 404

                user = {
                    "user_id": row[0],
                    "first_name": row[1],
                    "last_name": row[2],
                    "email": row[3],
                    "phone_num": row[4],
                    "password": row[5],
                }

        return jsonify(user), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500


# add one user
@app.route("/api/user", methods=["POST"])
def create_user():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                first_name = request.args.get("first_name")
                last_name = request.args.get("last_name")
                email = request.args.get("email")
                phone_num = request.args.get("phone_num")
                password = request.args.get("password")

                cursor.execute('INSERT INTO tothecloset."user" ' "(first_name, last_name, email, phone_num, password) " "VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING user_id", (first_name, last_name, email, phone_num, password))

                user_id = cursor.fetchone()[0]

                if user_id is not None:
                    connection.commit()
                    return jsonify({"message": "User inserted successfully", "user_id": user_id}), 201
                else:
                    return jsonify({"error": "Failed to insert user"}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({"error": str(error)}), 500


########## DB: wishlist


@app.route("/api/wishlist/<user_id>/", methods=["GET"])
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


# add one wishlist
@app.route("/api/wishlist", methods=["POST"])
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


# delete one product in wishlist
@app.route("/api/wishlist/<user_id>/<product_id>", methods=["DELETE"])
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


########## size recommender


@app.route("/api/size_recommender/<user_id>/<product_id>", methods=["GET"])
def size_recommender(user_id, product_id):
    # get sizing chart
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT sizing_chart, category FROM tothecloset."product"' "WHERE product_id = %s", (product_id))

                row = cursor.fetchone()
                sizing_chart = jsonify(row[0])
                category = row[1]

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500

    # get user preference
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."clothing_preference"' "WHERE user_id = %s", (user_id))

                user_preference = jsonify(cursor.fetchone()[0])

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500

    return recommend(category, sizing_chart, user_preference)


# all measurements are in cm
# category - string EITHER Top / Bottom / One-piece / Accessory(ignore)
# sizing chart - nested json
# user detail - json
def recommend(category, sizing_chart, user_detail):
    if category == "Accessory":
        return "Size cannot be reccommended for accessories"

    height = user_detail["height"]
    weight = user_detail["weight"]
    shoulder_width = user_detail["shoulder_width"]
    waist = user_detail["waist"]
    hip = user_detail["hip"]
    top_fit = user_detail["top_fit"]
    bottom_fit = user_detail["bottom_fit"]

    # bmi category
    bmi = weight / ((height / 100) ** 2)
    bmi_category = ""

    if bmi < 18.5:
        bmi_category = "underweight"
    elif bmi >= 18.5 and bmi <= 22.9:
        bmi_category = "normal"
    elif bmi >= 23.0 and bmi <= 27.4:
        bmi_category = "pre-overweight"
    else:
        bmi_category = "overweight"

    sizes = []

    # TOP: Use shoulder_width, bmi, top_fit
    if category == "Top":
        # get shoulder size
        shoulder_size = 0
        indx = 0

        for size in sizing_chart:
            sizes.append(size)

            shoulder_width_arr = size["shoulder_width"].split("-")  # [min, max]

            if int(shoulder_width_arr[0]) <= shoulder_width and shoulder_width < int(shoulder_width_arr[1]):
                shoulder_size = indx

            indx += 1

        # get bmi size
        bmi_size = 0

        if bmi_category == "underweight":
            bmi_size = shoulder_size - 1
        elif bmi_category == "normal":
            bmi_size = shoulder_size
        elif bmi_category == "pre-overweight":
            bmi_size = shoulder_size + 0.5
        else:
            bmi_size = shoulder_size + 1

        # get preference size
        if top_fit == "tight":
            preference_size = shoulder_size - 1
        elif top_fit == "normal":
            preference_size = shoulder_size
        else:
            preference_size = shoulder_size + 1

        avg_size = (shoulder_size + bmi_size + preference_size) / 3
        recc_size = math.ceil(avg_size)

        if recc_size < 0:
            return sizes[0]
        elif recc_size >= len(sizes):
            return sizes[len(sizes) - 1]
        else:
            sizes[recc_size]

    # BOTTOM: use waist, hip, bmi, bottom_fit
    elif category == "Bottom":
        # get waist and hip size
        waist_size = 0
        hip_size = 0
        indx = 0

        for size in sizing_chart:
            sizes.append(size)

            waist_arr = size["waist"].split("-")  # [min, max]

            if int(waist_arr[0]) <= waist and waist < int(waist_arr[1]):
                waist_size = indx

            hip_arr = size["hip"].split("-")  # [min, max]

            if int(hip_arr[0]) <= hip and hip < int(hip_arr[1]):
                waist_size = indx

            indx += 1

        # get avg of sizing chart size
        avg_chart_size = (waist_size + hip_size) / 2

        # get bmi size
        bmi_size = 0

        if bmi_category == "underweight":
            bmi_size = avg_chart_size - 1
        elif bmi_category == "normal":
            bmi_size = avg_chart_size
        elif bmi_category == "pre-overweight":
            bmi_size = avg_chart_size + 0.5
        else:
            bmi_size = avg_chart_size + 1

        # get preference size
        if top_fit == "tight":
            preference_size = avg_chart_size - 1
        elif top_fit == "normal":
            preference_size = avg_chart_size
        else:
            preference_size = avg_chart_size + 1

        avg_size = (avg_chart_size + bmi_size + preference_size) / 3
        recc_size = math.ceil(avg_size)

        if recc_size < 0:
            return sizes[0]
        elif recc_size >= len(sizes):
            return sizes[len(sizes) - 1]
        else:
            sizes[recc_size]

    # One-piece: use shoulder_width, waist, hip, bmi, top_fit
    else:
        # get shoulder_width, waist and hip size
        shoulder_size = 0
        waist_size = 0
        hip_size = 0
        indx = 0

        for size in sizing_chart:
            sizes.append(size)

            shoulder_arr = size["shoulder"].split("-")  # [min, max]

            if int(shoulder_arr[0]) <= shoulder_width and shoulder_width < int(shoulder_arr[1]):
                shoulder_size = indx

            waist_arr = size["waist"].split("-")  # [min, max]

            if int(waist_arr[0]) <= waist and waist < int(waist_arr[1]):
                waist_size = indx

            hip_arr = size["hip"].split("-")  # [min, max]

            if int(hip_arr[0]) <= hip and hip < int(hip_arr[1]):
                waist_size = indx

            indx += 1

        # get avg of sizing chart size
        avg_chart_size = (shoulder_size + waist_size + hip_size) / 3

        # get bmi size
        bmi_size = 0

        if bmi_category == "underweight":
            bmi_size = avg_chart_size - 1
        elif bmi_category == "normal":
            bmi_size = avg_chart_size
        elif bmi_category == "pre-overweight":
            bmi_size = avg_chart_size + 0.5
        else:
            bmi_size = avg_chart_size + 1

        # get preference size
        if top_fit == "tight":
            preference_size = avg_chart_size - 1
        elif top_fit == "normal":
            preference_size = avg_chart_size
        else:
            preference_size = avg_chart_size + 1

        avg_size = (avg_chart_size + bmi_size + preference_size) / 3
        recc_size = math.ceil(avg_size)

        if recc_size < 0:
            return sizes[0]
        elif recc_size >= len(sizes):
            return sizes[len(sizes) - 1]
        else:
            sizes[recc_size]


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

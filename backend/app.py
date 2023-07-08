from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os
import psycopg2

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

    return psycopg2.connect(
        host=db_host,
        port=db_port,
        dbname=db_name,
        user=db_user,
        password=db_password
    )
    
# to check connection
@app.route('/api/check_connection')
def check_connection():
    try:
        with get_db_connection() as connection:
            return 'PostgreSQL connection successful'
    except (Exception, psycopg2.Error) as error:
        return jsonify({'error': str(error)}), 500





########## DB: address

# get all addresses
@app.route('/api/address', methods=['GET'])
def get_addresses():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."address"')
                rows = cursor.fetchall()
                
                if len(rows) == 0:
                    return jsonify('No addresses found'), 404
                
                addresses = [{
                        'address_id': row[0], 
                        'user_id': row[1], 
                        'address_num': row[2],
                        'address_1': row[3],
                        'address_2': row[4],
                        'city': row[5],
                        "state": row[6],
                        "postal_code": row[7],
                        "is_billing_address": row[8]
                    } for row in rows]
                
        return jsonify(addresses), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({'error': str(error)}), 500


# get all address under user id
@app.route('/api/address/<user_id>/', methods=['GET'])
def get_address_from_user_id(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                
                cursor.execute(
                    'SELECT * FROM tothecloset."address"'
                    'WHERE user_id = %s',
                    (user_id)
                )
                
                rows = cursor.fetchall()
                
                if len(rows) == 0:
                    return jsonify('No addresses found under user_id: ' + user_id), 404
                
                addresses = [{
                        'address_id': row[0], 
                        'user_id': row[1], 
                        'address_num': row[2],
                        'address_1': row[3],
                        'address_2': row[4],
                        'city': row[5],
                        "state": row[6],
                        "postal_code": row[7],
                        "is_billing_address": row[8]
                    } for row in rows]
                
        return jsonify(addresses), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({'error': str(error)}), 500

# add one address
@app.route('/api/address', methods=['POST'])
def create_address():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                user_id = request.args.get('user_id')
                address_num = request.args.get('address_num')
                address_1 = request.args.get('address_1')
                address_2 = request.args.get('address_2')
                city = request.args.get('city')
                state = request.args.get('state')
                postal_code = request.args.get('postal_code')
                is_billing_address = request.args.get('is_billing_address')

                cursor.execute(
                    'INSERT INTO tothecloset."address" '
                    '(user_id, address_num, address_1, address_2, city, state, postal_code, is_billing_address) '
                    'VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING address_id',
                    (user_id, address_num, address_1, address_2, city, state, postal_code, is_billing_address)
                )

                new_address_id = cursor.fetchone()[0]
                
                if new_address_id is not None:
                    connection.commit()
                    return jsonify({'message': 'Address inserted successfully', 'address_id': new_address_id}), 201
                else:
                    return jsonify({'error': 'Failed to insert address'}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500

# update one address
@app.route('/api/address/<user_id>/<address_num>', methods=['PUT'])
def update_address(user_id, address_num):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                address_1 = request.args.get('address_1')
                address_2 = request.args.get('address_2')
                city = request.args.get('city')
                state = request.args.get('state')
                postal_code = request.args.get('postal_code')
                is_billing_address = request.args.get('is_billing_address')

                rows_affected = cursor.execute(
                    'UPDATE tothecloset."address" SET '
                    'address_1 = %s, address_2 = %s, '
                    'city = %s, state = %s, postal_code = %s, '
                    'is_billing_address = %s WHERE user_id = %s AND address_num = %s',
                    (address_1, address_2, city, state, postal_code, is_billing_address, user_id, address_num)
                )
                
                if rows_affected == 0:
                    return jsonify({'error': 'Address not found'}), 404

        connection.commit()

        return jsonify({'message': 'Address updated successfully'}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500

# delete one address
@app.route('/api/address/<user_id>/<address_num>', methods=['DELETE'])
def delete_address(user_id, address_num):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                rows_affected = cursor.execute(
                    'DELETE FROM tothecloset."address" WHERE user_id = %s AND address_num = %s',
                    (user_id, address_num)
                )

            if rows_affected == 0:
                connection.rollback()
                return jsonify({'error': 'Address not found'}), 404
        
        connection.commit()
        
        return jsonify({'message': 'Address deleted successfully'}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500




########## DB: cart

# get all products under one user_id
@app.route('/api/cart/<user_id>/', methods=['GET'])
def get_cart_from_user_id(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                
                cursor.execute(
                    'SELECT * FROM tothecloset."cart"'
                    'WHERE user_id = %s',
                    (user_id)
                )
                
                rows = cursor.fetchall()
                
                if len(rows) == 0:
                    return jsonify('No products found under user_id: ' + user_id), 404
                
                products = [{
                        'product_id': row[0], 
                        'user_id': row[1], 
                        'rental_start': row[2],
                        'rental_end': row[3],
                        'rental_period': row[4],
                        'quantity': row[5]
                    } for row in rows]
                
        return jsonify(products), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({'error': str(error)}), 500

# add one product in cart
@app.route('/api/cart', methods=['POST'])
def create_product_in_cart():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                product_id = request.args.get('product_id')
                user_id = request.args.get('user_id')
                rental_start = request.args.get('rental_start')
                rental_end = request.args.get('rental_end')
                rental_period = request.args.get('rental_period')
                quantity = request.args.get('quantity')

                cursor.execute(
                    'INSERT INTO tothecloset."cart" '
                    '(product_id, user_id, rental_start, rental_end, rental_period, quantity) '
                    'VALUES (%s, %s, %s, %s, %s, %s) RETURNING product_id, user_id',
                    (product_id, user_id, rental_start, rental_end, rental_period, quantity)
                )

                return_values = cursor.fetchall()
                
                if return_values is not None:
                    connection.commit()
                    return jsonify({'message': 'Product inserted into cart successfully', 
                                    'product_id': return_values[0],
                                    'user_id': return_values[1]
                                    }), 201
                else:
                    return jsonify({'error': 'Failed to insert product in cart'}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500

# update one product in cart
@app.route('/api/cart/<user_id>/<product_id>', methods=['PUT'])
def update_cart(user_id, product_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                rental_start = request.args.get('rental_start')
                rental_end = request.args.get('rental_end')
                rental_period = request.args.get('rental_period')
                quantity = request.args.get('quantity')

                rows_affected = cursor.execute(
                    'UPDATE tothecloset."cart" SET '
                    'rental_start = %s, rental_end = %s, '
                    'rental_period = %s, quantity = %s'
                    'WHERE user_id = %s AND product_id = %s',
                    (rental_start, rental_end, rental_period, quantity, user_id, product_id)
                )
                
                if rows_affected == 0:
                    return jsonify({'error': "Product not found in this user's cart"}), 404

        connection.commit()

        return jsonify({'message': 'Product updated successfully'}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500

# delete one product in user's cart
@app.route('/api/cart/<user_id>/<product_id>', methods=['DELETE'])
def delete_product_in_cart(user_id, product_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                rows_affected = cursor.execute(
                    'DELETE FROM tothecloset."cart" WHERE user_id = %s AND product_id = %s',
                    (user_id, product_id)
                )

            if rows_affected == 0:
                connection.rollback()
                return jsonify({'error': "Product not found in user's cart"}), 404
        
        connection.commit()
        
        return jsonify({'message': "Product deleted successfully from user's cart"}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500
    
    
    
########## DB: clothing_preferences

# get clothing preference for user_id
@app.route('/api/clothing_preference/<user_id>/', methods=['GET'])
def get_clothing_preference_from_user_id(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                
                cursor.execute(
                    'SELECT * FROM tothecloset."clothing_preference"'
                    'WHERE user_id = %s',
                    (user_id)
                )
                
                row = cursor.fetchone()[0];
                
                if len(row) == 0:
                    return jsonify('No clothing preference found under user_id: ' + user_id), 404
                
                clothing_preference = {
                        'user_id': row[0], 
                        'height': row[1], 
                        'weight': row[2],
                        'waist': row[3],
                        'shoulder_width': row[4],
                        'hip': row[5],
                        "top_fit": row[6],
                        "bottom_fit": row[7],
                    } 
                                        
        return jsonify(clothing_preference), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({'error': str(error)}), 500

# add one clothing preference 
@app.route('/api/clothing_preference', methods=['POST'])
def create_clothing_preference():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                user_id = request.args.get('user_id')
                height = request.args.get('height')
                weight = request.args.get('weight')
                waist = request.args.get('waist')
                shoulder_width = request.args.get('shoulder_width')
                hip = request.args.get('hip')
                top_fit = request.args.get('top_fit')
                bottom_fit = request.args.get('bottom_fit')

                cursor.execute(
                    'INSERT INTO tothecloset."clothing_preference" '
                    '(user_id, height, weight, waist, shoulder_width, hip, top_fit, bottom_fit) '
                    'VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING user_id',
                    (user_id, height, weight, waist, shoulder_width, hip, top_fit, bottom_fit)
                )

                user_id = cursor.fetchone()[0]
                
                if user_id is not None:
                    connection.commit()
                    return jsonify({'message': 'Clothing_preference inserted successfully', 'user_id': user_id}), 201
                else:
                    return jsonify({'error': 'Failed to insert clothing preference'}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500

# update one clothing preference
@app.route('/api/clothing_preference/<user_id>', methods=['PUT'])
def update_clothing_preference(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                height = request.args.get('height')
                weight = request.args.get('weight')
                waist = request.args.get('waist')
                shoulder_width = request.args.get('shoulder_width')
                hip = request.args.get('hip')
                top_fit = request.args.get('top_fit')
                bottom_fit = request.args.get('bottom_fit')

                rows_affected = cursor.execute(
                    'UPDATE tothecloset."clothing_preference" SET '
                    'height = %s, weight = %s, '
                    'waist = %s, shoulder_width = %s, hip = %s, '
                    'top_fit = %s, bottom_fit = %s WHERE user_id = %s',
                    (height, weight, waist, shoulder_width, hip, top_fit, bottom_fit, user_id)
                )
                
                if rows_affected == 0:
                    return jsonify({'error': 'Clothing preference not found for user: ' + user_id}), 404

        connection.commit()

        return jsonify({'message': 'Clothing preference updated successfully'}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500

# delete one clothing preference
@app.route('/api/clothing_preference/<user_id>', methods=['DELETE'])
def delete_clothing_preference(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                rows_affected = cursor.execute(
                    'DELETE FROM tothecloset."clothing_preference" WHERE user_id = %s',
                    (user_id)
                )

            if rows_affected == 0:
                connection.rollback()
                return jsonify({'error': 'Clothing preference not found'}), 404
        
        connection.commit()
        
        return jsonify({'message': 'Clothing preference deleted successfully'}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500




########## DB: delivery

# get all deliveries
@app.route('/api/delivery', methods=['GET'])
def get_deliveries():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."delivery"')
                rows = cursor.fetchall()
                
                if len(rows) == 0:
                    return jsonify('No deliveries found'), 404
                
                deliveries = [{
                        'delivery_id': row[0], 
                        'user_id': row[1],
                        'address_id': row[2], 
                        'delivery_date': row[3],
                        'delivery_status': row[4]
                    } for row in rows]
                
        return jsonify(deliveries), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({'error': str(error)}), 500


# get all deliveries under user id
@app.route('/api/delivery/<user_id>/', methods=['GET'])
def get_delivery_from_user_id(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                
                cursor.execute(
                    'SELECT * FROM tothecloset."delivery"'
                    'WHERE user_id = %s',
                    (user_id)
                )
                
                rows = cursor.fetchall()
                
                if len(rows) == 0:
                    return jsonify('No deliveries found under user_id: ' + user_id), 404
                
                deliveries = [{
                        'delivery_id': row[0], 
                        'user_id': row[1],
                        'address_id': row[2], 
                        'delivery_date': row[3],
                        'delivery_status': row[4]
                    } for row in rows]
                
        return jsonify(deliveries), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({'error': str(error)}), 500

# add one delivery
@app.route('/api/delivery', methods=['POST'])
def create_delivery():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                user_id = request.args.get('user_id')
                address_id = request.args.get('address_id')
                delivery_date = request.args.get('delivery_date')
                delivery_status = request.args.get('delivery_status')
                
                cursor.execute(
                    'INSERT INTO tothecloset."delivery" '
                    '(user_id, address_id, delivery_date, delivery_status) '
                    'VALUES (%s, %s, %s, %s) RETURNING delivery_id',
                    (user_id, address_id, delivery_date, delivery_status)
                )

                new_delivery_id = cursor.fetchone()[0]
                
                if new_delivery_id is not None:
                    connection.commit()
                    return jsonify({'message': 'Delivery inserted successfully', 'delivery_id': new_delivery_id}), 201
                else:
                    return jsonify({'error': 'Failed to insert delivery'}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500

# update one delivery
@app.route('/api/delivery/<delivery_id>', methods=['PUT'])
def update_delivery(delivery_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                user_id = request.args.get('user_id')
                address_id = request.args.get('address_id')
                delivery_date = request.args.get('delivery_date')
                delivery_status = request.args.get('delivery_status')

                rows_affected = cursor.execute(
                    'UPDATE tothecloset."delivery" SET '
                    'user_id = %s, address_id = %s, '
                    'delivery_date = %s, delivery_status = %s WHERE delivery_id = %s',
                    (user_id, address_id, delivery_date, delivery_status, delivery_id)
                )
                
                if rows_affected == 0:
                    return jsonify({'error': 'Delivery not found'}), 404

        connection.commit()

        return jsonify({'message': 'Delivery updated successfully'}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500

# delete one delivery
@app.route('/api/delivery/<delivery_id>', methods=['DELETE'])
def delete_delivery(delivery_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                rows_affected = cursor.execute(
                    'DELETE FROM tothecloset."delivery" WHERE delivery_id = %s',
                    (delivery_id)
                )

            if rows_affected == 0:
                connection.rollback()
                return jsonify({'error': 'Delivery not found'}), 404
        
        connection.commit()
        
        return jsonify({'message': 'Delivery deleted successfully'}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500





########## DB: payment

# get all payments
@app.route('/api/payment', methods=['GET'])
def get_payments():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."payment"')
                rows = cursor.fetchall()
                
                if len(rows) == 0:
                    return jsonify('No payments found'), 404
                
                payments = [{
                        'payment_id': row[0], 
                        'user_id': row[1], 
                        'cardholder_name': row[2],
                        'card_number': row[3],
                        'cvc': row[4],
                        'expiry_year': row[5],
                        "expiry_month": row[6],
                    } for row in rows]
                
        return jsonify(payments), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({'error': str(error)}), 500


# get all payment under user id
@app.route('/api/payment/<user_id>/', methods=['GET'])
def get_payment_from_user_id(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                
                cursor.execute(
                    'SELECT * FROM tothecloset."payment"'
                    'WHERE user_id = %s',
                    (user_id)
                )
                
                rows = cursor.fetchall()
                
                if len(rows) == 0:
                    return jsonify('No payments found under user_id: ' + user_id), 404
                
                payments = [{
                        'payment_id': row[0], 
                        'user_id': row[1], 
                        'cardholder_name': row[2],
                        'card_number': row[3],
                        'cvc': row[4],
                        'expiry_year': row[5],
                        "expiry_month": row[6],
                    } for row in rows]
                
        return jsonify(payments), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({'error': str(error)}), 500

# add one payment
@app.route('/api/payment', methods=['POST'])
def create_payment():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                user_id = request.args.get('user_id')
                cardholder_name = request.args.get('cardholder_name')
                card_number = request.args.get('card_number')
                cvc = request.args.get('cvc')
                expiry_year = request.args.get('expiry_year')
                expiry_month = request.args.get('expiry_month')
        
                cursor.execute(
                    'INSERT INTO tothecloset."payment" '
                    '(user_id, cardholder_name, card_number, cvc, expiry_year, expiry_month) '
                    'VALUES (%s, %s, %s, %s, %s, %s) RETURNING payment_id',
                    (user_id, cardholder_name, card_number, cvc, expiry_year, expiry_month)
                )

                new_payment_id = cursor.fetchone()[0]
                
                if new_payment_id is not None:
                    connection.commit()
                    return jsonify({'message': 'Payment inserted successfully', 'payment_id': new_payment_id}), 201
                else:
                    return jsonify({'error': 'Failed to insert payment'}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500

# update one payment
@app.route('/api/payment/<payment_id>', methods=['PUT'])
def update_payment(payment_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                user_id = request.args.get('user_id')
                cardholder_name = request.args.get('cardholder_name')
                card_number = request.args.get('card_number')
                cvc = request.args.get('cvc')
                expiry_year = request.args.get('expiry_year')
                expiry_month = request.args.get('expiry_month')

                rows_affected = cursor.execute(
                    'UPDATE tothecloset."payment" SET '
                    'user_id = %s, cardholder_name = %s, '
                    'card_number = %s, cvc = %s, expiry_year = %s, '
                    'expiry_month = %s WHERE payment_id = %s',
                    (user_id, cardholder_name, card_number, cvc, expiry_year, expiry_month, payment_id)
                )
                
                if rows_affected == 0:
                    return jsonify({'error': 'Payment not found'}), 404

        connection.commit()

        return jsonify({'message': 'Payment updated successfully'}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500

# delete one payment
@app.route('/api/payment/<payment_id>', methods=['DELETE'])
def delete_payment(payment_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                rows_affected = cursor.execute(
                    'DELETE FROM tothecloset."payment" WHERE payment_id = %s',
                    (payment_id)
                )

            if rows_affected == 0:
                connection.rollback()
                return jsonify({'error': 'Payment not found'}), 404
        
        connection.commit()
        
        return jsonify({'message': 'Payment deleted successfully'}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500





########## DB: product

# get all products
@app.route('/api/product', methods=['GET'])
def get_products():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."product"')
                rows = cursor.fetchall()
                
                if len(rows) == 0:
                    return jsonify('No products found'), 404
                
                products = [{
                        'product_id': row[0], 
                        'product_name': row[1],
                        'brand': row[2], 
                        'size': row[3],
                        'colour': row[4],
                        'price': row[5],
                        'type': row[6],
                        "image_url": row[7],
                        "date_added": row[8]
                    } for row in rows]
                
        return jsonify(products), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({'error': str(error)}), 500


# get one product
@app.route('/api/product/<product_id>/', methods=['GET'])
def get_product(product_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                
                cursor.execute(
                    'SELECT * FROM tothecloset."product"'
                    'WHERE product_id = %s',
                    (product_id)
                )
                
                row = cursor.fetchall()
                
                if len(row) == 0:
                    return jsonify('No product found: ' + product_id), 404
                
                product = {
                        'product_id': row[0], 
                        'product_name': row[1],
                        'brand': row[2], 
                        'size': row[3],
                        'colour': row[4],
                        'price': row[5],
                        'type': row[6],
                        "image_url": row[7],
                        "date_added": row[8]
                    }
                
        return jsonify(product), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({'error': str(error)}), 500
    
# get filtered products with specified brands, colour, price, size, type

# brands - string[]
# colour - string []
# price - [min(float), max(float)] both inclusive
# size - string[]
# type - string[]

# price is always passed in, others are optional

# case sensitive, look at db

# @app.route('/api/product/filter', methods=['GET'])
# def get_filtered_products():
#     try:

#         brand = request.args.getlist('brand')
#         size = request.args.getlist('size')
#         colour = request.args.getlist('colour')
#         price = request.args.get('price')
#         type = request.args.getlist('type')

#         query = 'SELECT * FROM tothecloset."product" WHERE 1=1'
#         params = []

#         with get_db_connection() as connection:
#             with connection.cursor() as cursor:
#                 cursor.execute(query, params)
#                 rows = cursor.fetchall()

#                 if len(rows) == 0:
#                     return jsonify({'message': 'No products found with the specified filters'}), 404

#                 products = [{
#                     'product_id': row[0], 
#                     'product_name': row[1],
#                     'brand': row[2], 
#                     'size': row[3],
#                     'colour': row[4],
#                     'price': row[5],
#                     'type': row[6],
#                     'image_url': row[7],
#                     'date_added': row[8]
#                 } for row in rows]

#         return jsonify({'products': products}), 200

#     except (Exception, psycopg2.Error) as error:
#         return jsonify({'error': str(error)}), 500


# add one product
@app.route('/api/product', methods=['POST'])
def create_product():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                product_name = request.args.get('product_name')
                brand = request.args.get('brand')
                size = request.args.get('size')
                colour = request.args.get('colour')
                price = request.args.get('price')
                type = request.args.get('type')
                image_url = request.args.get('image_url')
                date_added = request.args.get('date_added')

                cursor.execute(
                    'INSERT INTO tothecloset."address" '
                    '(product_name, brand, size, colour, price, type, image_url, date_added) '
                    'VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING product_id',
                    (product_name, brand, size, colour, price, type, image_url, date_added)
                )

                new_product_id = cursor.fetchone()[0]
                
                if new_product_id is not None:
                    connection.commit()
                    return jsonify({'message': 'Product inserted successfully', 'product_id': new_product_id}), 201
                else:
                    return jsonify({'error': 'Failed to insert product'}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500

# update one product
@app.route('/api/product/<product_id>', methods=['PUT'])
def update_product(product_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                product_name = request.args.get('product_name')
                brand = request.args.get('brand')
                size = request.args.get('size')
                colour = request.args.get('colour')
                price = request.args.get('price')
                type = request.args.get('type')
                image_url = request.args.get('image_url')
                date_added = request.args.get('date_added')

                rows_affected = cursor.execute(
                    'UPDATE tothecloset."address" SET '
                    'product_name = %s, brand = %s, '
                    'size = %s, colour = %s, price = %s, '
                    'type = %s, image_url = %s'
                    'date_added = %s WHERE product_id = %s',
                    (product_name, brand, size, colour, price, type, image_url, date_added, product_id)
                )
                
                if rows_affected == 0:
                    return jsonify({'error': 'Product not found'}), 404

        connection.commit()

        return jsonify({'message': 'Product updated successfully'}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500

# delete one product
@app.route('/api/product/<product_id>', methods=['DELETE'])
def delete_product(product_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                rows_affected = cursor.execute(
                    'DELETE FROM tothecloset."product" WHERE product_id = %s',
                    (product_id)
                )

            if rows_affected == 0:
                connection.rollback()
                return jsonify({'error': 'Product not found'}), 404
        
        connection.commit()
        
        return jsonify({'message': 'Product deleted successfully'}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500




########## DB: product_availability

# get all product availability for product id
@app.route('/api/product_availability/<product_id>/', methods=['GET'])
def get_product_availability_from_product_id(product_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                
                cursor.execute(
                    'SELECT * FROM tothecloset."product_availability"'
                    'WHERE product_id = %s',
                    (product_id)
                )
                
                rows = cursor.fetchall()
                
                if len(rows) == 0:
                    return jsonify('No product availability found under product_id: ' + product_id), 404
                
                product_availabilities = [{
                        'date': row[0], 
                        'is_booked': row[1]
                    } for row in rows]
                
        return jsonify(product_availabilities), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({'error': str(error)}), 500

# update one product_availability
@app.route('/api/product_availability/<product_id>/<date>', methods=['PUT'])
def update_product_availability(product_id, date):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                is_booked = request.args.get('is_booked')

                rows_affected = cursor.execute(
                    'UPDATE tothecloset."product_availability" SET '
                    'is_boooked = %s WHERE product_id = %s AND date = %s',
                    (is_booked, product_id, date)
                )
                
                if rows_affected == 0:
                    return jsonify({'error': 'Product availability not found'}), 404

        connection.commit()

        return jsonify({'message': 'Product availability updated successfully'}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500




########## DB: rental

# get all rentals under user id
@app.route('/api/rental/<user_id>/', methods=['GET'])
def get_rental_from_user_id(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                
                cursor.execute(
                    'SELECT * FROM tothecloset."rental"'
                    'WHERE user_id = %s',
                    (user_id)
                )
                
                rows = cursor.fetchall()
                
                if len(rows) == 0:
                    return jsonify('No rentals found under user_id: ' + user_id), 404
                
                rentals = [{
                        'rental_id': row[0], 
                        'user_id': row[1], 
                        'product_id': row[2],
                        'rental_start': row[3],
                        'rental_end': row[4],
                        'rental_period': row[5],
                        "transaction_id": row[6],
                        "delivery_id": row[7],
                        "return_id": row[8],
                        "is_ongoing": row[9]
                    } for row in rows]
                
        return jsonify(rentals), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({'error': str(error)}), 500

# add one rental
@app.route('/api/rental', methods=['POST'])
def create_address():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                user_id = request.args.get('user_id')
                product_id = request.args.get('product_id')
                rental_start = request.args.get('rental_start')
                rental_end = request.args.get('rental_end')
                rental_period = request.args.get('rental_period')
                transaction_id = request.args.get('transaction_id')
                delivery_id = request.args.get('delivery_id')
                return_id = request.args.get('return_id')
                is_ongoing = request.args.get("is_ongoing")

                cursor.execute(
                    'INSERT INTO tothecloset."address" '
                    '(user_id, product_id, rental_start, rental_end, rental_period, transaction_id, delivery_id, return_id, is_ongoing) '
                    'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING rental_id',
                    (user_id, product_id, rental_start, rental_end, rental_period, transaction_id, delivery_id, return_id, is_ongoing)
                )

                new_rental_id = cursor.fetchone()[0]
                
                if new_rental_id is not None:
                    connection.commit()
                    return jsonify({'message': 'Rental inserted successfully', 'rental_id': new_rental_id}), 201
                else:
                    return jsonify({'error': 'Failed to insert rental'}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500


########## DB: return

# get all return under user id
@app.route('/api/return/<user_id>/', methods=['GET'])
def get_return_from_user_id(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                
                cursor.execute(
                    'SELECT * FROM tothecloset."return"'
                    'WHERE user_id = %s',
                    (user_id)
                )
                
                rows = cursor.fetchall()
                
                if len(rows) == 0:
                    return jsonify('No return found under user_id: ' + user_id), 404
                
                rentals = [{
                        'return_id': row[0], 
                        'user_id': row[1], 
                        'product_id': row[2],
                        'return_date': row[3],
                        'confirmation_date': row[4],
                        'is_late': row[5]
                    } for row in rows]
                
        return jsonify(rentals), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({'error': str(error)}), 500

# add one rental
@app.route('/api/rental', methods=['POST'])
def create_rental():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                user_id = request.args.get('user_id')
                product_id = request.args.get('product_id')
                return_date = request.args.get('return_date')
                confirmation_date = request.args.get('confirmation_date')
                is_late = request.args.get('is_late')

                cursor.execute(
                    'INSERT INTO tothecloset."address" '
                    '(user_id, product_id, return_date, confirmation_date, is_late) '
                    'VALUES (%s, %s, %s, %s, %s) RETURNING return_id',
                    (user_id, product_id, return_date, confirmation_date, is_late)
                )

                new_return_id = cursor.fetchone()[0]
                
                if new_return_id is not None:
                    connection.commit()
                    return jsonify({'message': 'Return inserted successfully', 'return_id': new_return_id}), 201
                else:
                    return jsonify({'error': 'Failed to insert return'}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500



########## DB: transaction

# add one transaction
@app.route('/api/transaction', methods=['POST'])
def create_transaction():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                user_id = request.args.get('user_id')
                transaction_date = request.args.get('transaction_date')
                payment_id = request.args.get('payment_id')
                payment_method = request.args.get('payment_method')
                payment_amount = request.args.get('payment_amount')

                cursor.execute(
                    'INSERT INTO tothecloset."transaction" '
                    '(user_id, transaction_date, payment_id, payment_method, payment_amount) '
                    'VALUES (%s, %s, %s, %s, %s) RETURNING transaction_id',
                    (user_id, transaction_date, payment_id, payment_method, payment_amount)
                )

                new_transaction_id = cursor.fetchone()[0]
                
                if new_transaction_id is not None:
                    connection.commit()
                    return jsonify({'message': 'Transaction inserted successfully', 'transaction_id': new_transaction_id}), 201
                else:
                    return jsonify({'error': 'Failed to insert transaction'}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500





########## DB: user


# get one user
@app.route('/api/user/<user_id>/', methods=['GET'])
def get_user(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                
                cursor.execute(
                    'SELECT * FROM tothecloset."address"'
                    'WHERE user_id = %s',
                    (user_id)
                )
                
                row = cursor.fetchall()
                
                if len(row) == 0:
                    return jsonify('No user found: ' + user_id), 404
                
                user = {
                        'user_id': row[0],
                        'first_name': row[1], 
                        'last_name': row[2], 
                        'email': row[3],
                        'phone_num': row[4],
                        'password': row[5],
                    }
                
        return jsonify(user), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({'error': str(error)}), 500

# add one user
@app.route('/api/user', methods=['POST'])
def create_user():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                first_name = request.args.get('first_name')
                last_name = request.args.get('last_name')
                email = request.args.get('email')
                phone_num = request.args.get('phone_num')
                password = request.args.get('password')

                cursor.execute(
                    'INSERT INTO tothecloset."user" '
                    '(first_name, last_name, email, phone_num, password) '
                    'VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING user_id',
                    (first_name, last_name, email, phone_num, password)
                )

                user_id = cursor.fetchone()[0]
                
                if user_id is not None:
                    connection.commit()
                    return jsonify({'message': 'User inserted successfully', 'user_id': user_id}), 201
                else:
                    return jsonify({'error': 'Failed to insert user'}), 500

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500




########## DB: wishlist

@app.route('/api/wishlist/<user_id>/', methods=['GET'])
def get_wishlist_from_user_id(user_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    'SELECT product_id FROM tothecloset."wishlist" WHERE user_id = %s',
                    (user_id,)
                )
                rows = cursor.fetchall()
                
                if len(rows) == 0:
                    return jsonify({'message': 'No wishlist items found for user_id: ' + user_id}), 404
                
                product_ids = [row[0] for row in rows]
                
        return jsonify({'product_ids': product_ids}), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({'error': str(error)}), 500


# add one wishlist
@app.route('/api/wishlist', methods=['POST'])
def create_wishlist():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                user_id = request.args.get('user_id')
                product_id = request.args.get('product_id')
            
                rows_affected = cursor.execute(
                    'INSERT INTO tothecloset."wishlist" '
                    '(user_id, product_id) '
                    'VALUES (%s, %s)',
                    (user_id, product_id)
                )
                
                if rows_affected == 0:
                    return jsonify({'error': 'Failed to insert product into wishlist'}), 500

        connection.commit()

        return jsonify({'message': 'Product inserted successfully into wishlist'}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500

# delete one product in wishlist
@app.route('/api/wishlist/<user_id>/<product_id>', methods=['DELETE'])
def delete_product_from_wishlist(user_id, product_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                rows_affected = cursor.execute(
                    'DELETE FROM tothecloset."wishlist" WHERE user_id = %s AND product_id = %s',
                    (user_id, product_id)
                )

            if rows_affected == 0:
                connection.rollback()
                return jsonify({'error': 'Product not found in wishlist'}), 404
        
        connection.commit()
        
        return jsonify({'message': 'Product deleted successfully from wishlist'}), 200

    except (Exception, psycopg2.Error) as error:
        connection.rollback()
        return jsonify({'error': str(error)}), 500



if __name__ == '__main__':
    app.run()

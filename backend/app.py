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

    return psycopg2.connect(host=db_host, port=db_port, dbname=db_name, user=db_user, password=db_password)

from address import *
from cart import *
from clothing_preference import *
from delivery import *
from payment import *
from product import *
from product_availability import *
from rental import *
from returns import *
from transaction import *
from user import *
from wishlist import *
from size_recommender import *
# from image_search import *

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
def get_addresses_api():
    return get_addresses()


# get all address under user id
@app.route("/api/address/<user_id>/", methods=["GET"])
def get_address_from_user_id_api(user_id):
    return get_address_from_user_id(user_id)



# add one address
@app.route("/api/address", methods=["POST"])
def create_address_api():
    return create_address();


# update one address
@app.route("/api/address/<user_id>/<address_num>", methods=["PUT"])
def update_address_api(user_id, address_num):
    return update_address(user_id, address_num)


# delete one address
@app.route("/api/address/<user_id>/<address_num>", methods=["DELETE"])
def delete_address_api(user_id, address_num):
    return delete_address(user_id, address_num)


########## DB: cart


# get all products under one user_id
@app.route("/api/cart/<user_id>/", methods=["GET"])
def get_cart_from_user_id_api(user_id):
    return get_cart_from_user_id(user_id)


# add one product in cart
@app.route("/api/cart", methods=["POST"])
def create_product_in_cart_api():
    return create_product_in_cart()


# update one product in cart
@app.route("/api/cart/<user_id>/<product_id>", methods=["PUT"])
def update_cart_api(user_id, product_id):
    return update_cart(user_id, product_id)


# delete one product in user's cart
@app.route("/api/cart/<user_id>/<product_id>", methods=["DELETE"])
def delete_product_in_cart_api(user_id, product_id):
    return delete_product_in_cart(user_id, product_id)


########## DB: clothing_preferences


# get clothing preference for user_id
@app.route("/api/clothing_preference/<user_id>/", methods=["GET"])
def get_clothing_preference_from_user_id_api(user_id):
    return get_clothing_preference_from_user_id(user_id)


# add one clothing preference
@app.route("/api/clothing_preference", methods=["POST"])
def create_clothing_preference_api():
    return create_clothing_preference()



# update one clothing preference
@app.route("/api/clothing_preference/<user_id>", methods=["PUT"])
def update_clothing_preference_api(user_id):
    return update_clothing_preference(user_id)


# delete one clothing preference
@app.route("/api/clothing_preference/<user_id>", methods=["DELETE"])
def delete_clothing_preference_api(user_id):
    return delete_clothing_preference(user_id)



########## DB: delivery


# get all deliveries
@app.route("/api/delivery", methods=["GET"])
def get_deliveries_api():
    return get_deliveries()


# get all deliveries under user id
@app.route("/api/delivery/<user_id>/", methods=["GET"])
def get_delivery_from_user_id_api(user_id):
    return get_delivery_from_user_id()


# add one delivery
@app.route("/api/delivery", methods=["POST"])
def create_delivery_api():
    return create_delivery()


# update one delivery
@app.route("/api/delivery/<delivery_id>", methods=["PUT"])
def update_delivery_api(delivery_id):
    return update_delivery(delivery_id)


# delete one delivery
@app.route("/api/delivery/<delivery_id>", methods=["DELETE"])
def delete_delivery_api(delivery_id):
    return delete_delivery(delivery_id)



########## DB: payment


# get all payments
@app.route("/api/payment", methods=["GET"])
def get_payments_api():
    return get_payments()



# get all payment under user id
@app.route("/api/payment/<user_id>/", methods=["GET"])
def get_payment_from_user_id_api(user_id):
    return get_payment_from_user_id(user_id)


# add one payment
@app.route("/api/payment", methods=["POST"])
def create_payment_api():
    return create_payment()



# update one payment
@app.route("/api/payment/<payment_id>", methods=["PUT"])
def update_payment_api(payment_id):
    return update_payment(payment_id)


# delete one payment
@app.route("/api/payment/<payment_id>", methods=["DELETE"])
def delete_payment(payment_id):
    return delete_payment(payment_id)


########## DB: product


# get all products
@app.route("/api/product", methods=["GET"])
def get_products_api():
    return get_products()


# get one product
@app.route("/api/product/<product_id>/", methods=["GET"])
def get_product_api(product_id):
    return get_product(product_id)



# get filtered products with specified brands, colour, price, size, type

# brands - string[]
# colour - string []
# min_price - float ALWAYS PASSED IN
# max_price - float ALWAYS PASSED IN
# size - string[]
# type - string[]

# case sensitive, look at db

@app.route("/api/product/filter", methods=["GET"])
def get_filtered_products_api():
    return get_filtered_products()


# add one product
@app.route("/api/product", methods=["POST"])
def create_product_api():
    return create_product()


# update one product
@app.route("/api/product/<product_id>", methods=["PUT"])
def update_product_api(product_id):
    return update_product(product_id)


# delete one product
@app.route("/api/product/<product_id>", methods=["DELETE"])
def delete_product_api(product_id):
    return delete_product(product_id)

    
# get products by type
@app.route("/api/product/<type>", methods=["GET"])
def get_product_by_type_api(type):
    return get_product_by_type(type)


# sort products by price
@app.route("/api/product/sort", methods=["GET"])
def sort_products_by_price_api():
    return sort_products_by_price()

########## DB: product_availability


# get all product availability for product id
@app.route("/api/product_availability/<product_id>/", methods=["GET"])
def get_product_availability_from_product_id_api(product_id):
    return get_product_availability_from_product_id(product_id)


# update one product_availability
@app.route("/api/product_availability/<product_id>/<date>", methods=["PUT"])
def update_product_availability_api(product_id, date):
    return update_product_availability(product_id, date)



########## DB: rental


# get all rentals under user id
@app.route("/api/rental/<user_id>/", methods=["GET"])
def get_rental_from_user_id_api(user_id):
    return get_rental_from_user_id(user_id)


# add one rental
@app.route("/api/rental", methods=["POST"])
def create_rental_api():
    return create_rental()


########## DB: return


# get all return under user id
@app.route("/api/return/<user_id>/", methods=["GET"])
def get_return_from_user_id_api(user_id):
    return get_return_from_user_id(user_id)


# add one return
@app.route("/api/return", methods=["POST"])
def create_return_api():
    return create_return()



########## DB: transaction


# add one transaction
@app.route("/api/transaction", methods=["POST"])
def create_transaction_api():
    return create_transaction()



########## DB: user


# get one user
@app.route("/api/user/<user_id>/", methods=["GET"])
def get_user_api(user_id):
    return get_user(user_id)


# add one user
@app.route("/api/user", methods=["POST"])
def create_user_api():
    return create_user()



########## DB: wishlist


@app.route("/api/wishlist/<user_id>/", methods=["GET"])
def get_wishlist_from_user_id_api(user_id):
    return get_wishlist_from_user_id(user_id)


# add one wishlist
@app.route("/api/wishlist", methods=["POST"])
def create_wishlist_api():
    return create_wishlist()



# delete one product in wishlist
@app.route("/api/wishlist/<user_id>/<product_id>", methods=["DELETE"])
def delete_product_from_wishlist_api(user_id, product_id):
    return delete_product_from_wishlist(user_id, product_id)


########## size recommender


@app.route("/api/size_recommender/<user_id>/<product_id>", methods=["GET"])
def size_recommender_api(user_id, product_id):
    return size_recommender(user_id, product_id)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
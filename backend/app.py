from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import psycopg2


# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# get db connection
def get_db_connection():
    db_host = os.getenv("DB_HOST")
    db_port = os.getenv("DB_PORT")
    db_name = os.getenv("DB_NAME")
    db_user = os.getenv("DB_USER")
    db_password = os.getenv("DB_PASSWORD")

    return psycopg2.connect(host=db_host, port=db_port, dbname=db_name, user=db_user, password=db_password)

openaiApi = os.getenv("OPENAI_API_KEY")
openaiApi = "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"

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
# from text_search import *
# from image_search import *
from db_config import *

app = Flask(__name__)
CORS(app)

# to check connection
@app.route("/api/check_connection")
def check_connection_api():
    return check_connection()

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

@app.route("/api/cart/quantity/<user_id>/<product_id>/<quantity>", methods=["PUT"])
def update_quantity_api(user_id, product_id, quantity):
    return update_quantity(user_id, product_id, quantity)

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

# get delivery under delivery id
@app.route("/api/delivery/deliveryid/<delivery_id>/", methods=["GET"])
def get_delivery_from_delivery_id_api(delivery_id):
    return get_delivery_from_delivery_id(delivery_id)


# get all deliveries under user id
@app.route("/api/delivery/userid/<user_id>/", methods=["GET"])
def get_delivery_from_user_id_api(user_id):
    return get_delivery_from_user_id(user_id)


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

# paypal function
@app.route("/api/paypal_payment", methods=["POST"])
def create_order_api():
    return create_order()

@app.route("/capture_payment/<string:order_id>", methods=["POST"])
def capture_paypal_payment_api():
    return capture_paypal_payment()

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
@app.route("/api/product/<int:product_id>/", methods=["GET"])
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
@app.route("/api/product/type/<string:type>", methods=["GET"])
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


# get past rentals under user id
@app.route("/api/rental/past/<user_id>", methods=["GET"])
def get_past_rental_from_user_id_api(user_id):
    return get_past_rental_from_user_id(user_id)

# get ongoing rentals under user id
@app.route("/api/rental/ongoing/<user_id>", methods=["GET"])
def get_ongoing_rental_from_user_id_api(user_id):
    return get_ongoing_rental_from_user_id(user_id)

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

# get user from email
@app.route("/api/user/email/<email>", methods=["GET"])
def get_user_from_email_api(email):
    return get_user_from_email(email)

# check user details for login
@app.route("/api/user/login", methods=["POST"])
def check_login_api():
    return check_login()


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


@app.route("/api/size_recommender/<user_id>/<string:brand>/<string:category>", methods=["GET"])
def size_recommender_api(user_id, brand, category):
    return size_recommender(user_id, brand, category)

#get size_chart for brand and category
@app.route("/api/size_chart/<string:brand>/<string:category>", methods = ['GET'])
def size_chart_api(brand, category):
    return size_chart(brand, category)


########## text search

@app.route("/api/text_search/<prompt>", methods = ["GET"])
def text_search_api(prompt):
    return getCategories(openaiApi, prompt)


########## image search
@app.route("/api/image_search/bulk_insertion", methods = ["POST"])
def bulk_insertion_api():
    return bulk_insertion()

@app.route("/api/image_search/query", methods = ["POST"])
def query_api():
    return image_query()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

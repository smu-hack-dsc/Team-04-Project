from flask import jsonify, request
import os
import psycopg2
from app import get_db_connection

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
  
    
# get filtered products with specified brands, colour, price, size, type

# brands - string[]
# colour - string []
# min_price - float ALWAYS PASSED IN
# max_price - float ALWAYS PASSED IN
# size - string[]
# type - string[]

# case sensitive, look at db
def get_product(product_id):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."product" WHERE product_id = %s', (product_id,))

                rows = cursor.fetchall()

                if len(rows) == 0:
                    return jsonify("No product found: " + str(product_id)), 404

                # Assuming product_id is unique, there should be only one row
                row = rows[0]
                product = {
                    "product_id": row[0],
                    "brand": row[1],
                    "size": row[2],
                    "colour": row[3],
                    "price": row[4],
                    "type": row[5],
                    "image_url": row[6],
                    "date_added": row[7],
                    "product_name": row[8],
                    "sizing_chart": row[9],
                    "category": row[10]
                }

        return jsonify(product), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500
    
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

def get_product_by_type(type):
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM tothecloset."product" WHERE type = %s', (type,))
                rows = cursor.fetchall()
                if len(rows) == 0:
                    return jsonify("No product found under type: " + type), 404

                products = [{"product_id": row[0], "brand": row[1], "size": row[2], "colour": row[3], "price": row[4], "type": row[5], "image_url": row[6], "date_added": row[7], "product_name": row[8]} for row in rows]
        return jsonify(products), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500
    
def sort_products_by_price():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                sort_order = request.args.get('order', 'asc')
                #test using sort?order=dsc or sort?order=asc
                
                if sort_order.lower() == 'asc':
                    cursor.execute('SELECT * FROM tothecloset."product" ORDER BY price ASC')
                elif sort_order.lower() == 'dsc':
                    cursor.execute('SELECT * FROM tothecloset."product" ORDER BY price DESC')
                else:
                    return jsonify({"error": "Invalid sort order. Use 'asc' or 'dsc'."}), 400

                rows = cursor.fetchall()

                products = [
                    {
                        'product_id': row[0],
                        'brand': row[1],
                        'size': row[2],
                        'colour': row[3],
                        'price': row[4],
                        'type': row[5]
                    }
                    for row in rows
                ]

        return jsonify(products), 200

    except (Exception, psycopg2.Error) as error:
        return jsonify({"error": str(error)}), 500

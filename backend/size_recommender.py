from flask import jsonify, request
import os
import psycopg2
from db_config import get_db_connection
import math

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
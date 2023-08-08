from flask import jsonify, request
import openai
import re
import os
from dotenv import load_dotenv
import json
load_dotenv()

def getCategories(openaiApi,input):
    openai.api_key = os.getenv("OPENAI_API_KEY")
    # prompt = "Given the prompt \"" + input + "\" please give me the categories that are relevant to it from this list. " \
    #     "[Black, White, Red, Blue, Orange, Yellow, Green, Blue, Indigo, Top, Bottom, Full Body, Shirt, T-Shirt, Pants, Long Pant, Long Sleeved Shirt, Dress]" \
    #     "Please respond only with the categories without any other words"
    prompt = "Given the prompt \"" + input + "\" please give me the color, clothing type and brands that are in the prompt. Only give the categories if the word is fully in the prompt. There can be more than one of each category. Please respond only with the categories without any other words. If any categories are empty, respond with N/A" 
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        temperature = 0.2,
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )

    unprocessedArr = completion.choices[0].message.content.split("\n")
    finalArr = []
    regex_pattern = r".*?: "
    for categories in unprocessedArr:
        if categories != "":
            finalArr.append(re.sub(regex_pattern, "", categories).split(", "))
    # color = []
    # type = []
    # for categories in unprocessedArr:
    #     if categories in ["Black", "White", "Red", "Blue", "Orange", "Yellow", "Green", "Blue", "Indigo"]:
    #         color.append(categories)
    #     elif categories in ["Top", "Bottom", "Full Body", "Shirt", "T-Shirt", "Pants", "Long Pant", "Long Sleeved Shirt", "Dress"]:
    #         type.append(categories)
    json_data = json.dumps(finalArr)
    print(finalArr)
    return json_data
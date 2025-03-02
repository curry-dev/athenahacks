from google import genai
from google.genai import types

from flask import Flask, jsonify, request, make_response
from flask_cors import CORS



# mongodb start
import os
from dotenv import load_dotenv
from pymongo import MongoClient
import bson
load_dotenv()
MONGODB_URI = os.environ['MONGODB_URI']
client = MongoClient(MONGODB_URI)
db = client['outfitmatch']
collection = db['outfits']
# print('type:', collection.find_one({'_id': bson.ObjectId('67c3dfa8ebcd9116d4b7c501')})['type'])
# mongodb end



app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:4200", "http://127.0.0.1:4200"], "methods": ["GET", "POST", "OPTIONS"]}}, allow_headers=["Access-Control-Allow-Methods", "Access-Control-Allow-Origin", "Content-Type", "Access-Control-Allow-Headers"], supports_credentials=True)



google_API_KEY = os.environ['google_API_KEY']
client = genai.Client(api_key=google_API_KEY)



@app.route('/calculate', methods=['GET', 'POST'])
def calculate():
    fetched_prompt = request.json.get('prompt', '')
    additional_prompt = 'Just give the keywords of the outfit that tell what i should wear in terms of clothing. For example: tee, leather jacket, jeans. No text decoration. Just comma separated words. The request is: '
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents= additional_prompt + fetched_prompt,
    )

    # make an array of keywords from the response
    prompt1 = 'Generate a python list (as code) containing the suggested outfit keywords from the response attached. Ignore colours. Keep each element one word only. Let each element be an clothing piece. Reduce the list by choosing the best option from similar clothing. Like instead of suggesting both skirt and shorts, suggest only one of them. The keywords need to be certain words only. If the keyword is similar to these words, convert it into the word and put it into the list. The certain words are (blouses_shirts, denim, dresses, graphic_tees, jackets_coats, leggings, pants, rompers_jumpsuits, shorts, skirts, sweaters, sweatshirts_hoodies, tees_tanks, jackets_vests, shirts_polos, suiting). Convert the list into a dictionary like {"top": top, "bottom": bottom, "coat": coat, "other": other}. All keys are optional. Use this response to generate the list: ' + response.text
    getKeywords = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt1,
    )
    
    # look for keywords_array elements in the database
    keywords = getKeywords.text
    for keyword in keywords:
        collection.find_one({'type': keyword})
        
    return jsonify({'response': response.text})




@app.route('/tmp')
def tmp():
    return jsonify({'response': 'tmp'})



if __name__ == '__main__':
    app.run(debug=True)
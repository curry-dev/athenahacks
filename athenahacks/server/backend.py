from google import genai
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:4200", "http://127.0.0.1:4200"], "methods": ["GET", "POST", "OPTIONS"]}}, allow_headers=["Access-Control-Allow-Methods", "Access-Control-Allow-Origin", "Content-Type", "Access-Control-Allow-Headers"], supports_credentials=True)

client = genai.Client(api_key="AIzaSyBtSd9R2-fhiDqVaWvdCdvk0MtD_DKD4SM")



@app.route('/calculate', methods=['GET', 'POST'])
def calculate():
    fetched_prompt = request.json.get('prompt', '')

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=fetched_prompt,
    )

    return jsonify({'response': response.text})

@app.route('/tmp')
def tmp():
    return jsonify({'response': 'tmp'})



if __name__ == '__main__':
    app.run(debug=True)
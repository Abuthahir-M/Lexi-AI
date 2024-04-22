from flask import Flask, render_template, request, jsonify
from difflib import get_close_matches
import json
import os
# extra modules
from collections.abc import Container

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
json_path = os.path.join(BASE_DIR, 'static', 'data.json')

with open(json_path) as f:
    data = json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search/', methods=['POST'])
def search():
    # Retrieve the word from the request
    word = request.form['word'].lower()

    # Translate the word
    output = translate(word)

    # Return the result as JSON
    return jsonify({'result': output})

def translate(word):
    if word in data:
        return data[word]
    elif word.title() in data:
        return data[word.title()]
    elif word.upper() in data:
        return data[word.upper()]
    elif len(get_close_matches(word, data.keys())) > 0:
        return {"suggestions": get_close_matches(word, data.keys())}
        # yn = input("Oops did you mean %s?\nEnter Y if yes , or N if no" % get_close_matches(word, data.keys())[0])
        # if yn == "Y".lower():
        #     return data[get_close_matches(word, data.keys())[0]]
        # elif yn == "N".lower():
        #     return "The word doesn't exist"
        # else:
        #     return "I don't understand your word"
    else:
        return "The word doesn't exist, Please check it"

if __name__ == '__main__':
    app.run(debug=True)

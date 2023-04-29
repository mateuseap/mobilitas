from flask import Flask
from threading import Thread
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    f = open('semaphoresData.json')
    data = json.load(f)
    return data

@app.route('/paths')
def paths():
    f = open('generalGraph.json')
    data = json.load(f)
    return data

@app.route('/solution')
def solution():
    f = open('sol.json')
    data = json.load(f)
    return data

def run():
    app.run(host='0.0.0.0', port=81)

def keep_alive():
    t = Thread(target=run)
    t.start()

keep_alive()

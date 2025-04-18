from flask import Flask, request, jsonify, render_template
from config import config 
import openai
import os

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/")
def home():
    user_name = "Juan"
    return render_template('main.html', nombre=user_name) 

@app.route("/login", methods=['POST', "GET"])
def login():
    if request.method == "POST":
        print(request.form["username"])
        print(request.form["password"])
        return render_template("auth/login.html")
    else:
        return render_template("auth/login.html")

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message', '').lower()
    respuesta = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": user_input}]
    ).choices[0].message.content
    return jsonify({"response": respuesta})



if __name__ == '__main__':
    app.config.from_object(config["development"])
    app.run()


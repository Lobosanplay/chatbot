from flask import Blueprint, request, jsonify
import openai


chat = Blueprint("chatbot", __name__)


@chat.route('/chat', methods=['POST'])
def chatbot():
    user_input = request.json.get('message', '').lower()
    respuesta = openai.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": user_input}]
    ).choices[0].message.content
    return jsonify({"response": respuesta})

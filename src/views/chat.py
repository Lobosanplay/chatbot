from flask import Blueprint, request, jsonify
import openai


chat = Blueprint("chatbot", __name__)


@chat.route('/chat', methods=['POST'])
def chatbot():
    user_input = request.form.get('user-input', '').strip()
    if user_input == "hola":
        return jsonify({"response": "Hola como estas"})
    
    respuesta = openai.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": user_input}]
    ).choices[0].message.content
    return jsonify({"response": respuesta})

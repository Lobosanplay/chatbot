from flask import Blueprint, request, jsonify
import openai

# creamos un blueprint de el chatbot
chat = Blueprint("chatbot", __name__)


@chat.route('/chat', methods=['POST'])
def chatbot():
    user_input = request.form.get('user-input', '').strip()
    if user_input == "hola":
        return jsonify({"response": "Aun no hay una api en esta app"})
    
    respuesta = openai.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": user_input}]
    ).choices[0].message.content
    return jsonify({"response": respuesta})

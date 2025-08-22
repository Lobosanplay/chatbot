from flask import Blueprint, request, jsonify, abort, g
from models import ChatHistory
from functools import wraps
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



def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if g.user is None:
            abort(401)  # Unauthorized
        return f(*args, **kwargs)
    return decorated_function

@chat.route('/conversations')
@login_required
def get_conversations():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        conversations = ChatHistory.query.filter_by(user_id=g.user.id)\
            .order_by(ChatHistory.timestamp.desc())\
            .paginate(page=page, per_page=per_page, error_out=False)
        
        if not conversations.items:
            return jsonify({
                'conversations': [],
                'message': 'No conversations found',
                'has_next': False,
                'has_prev': False,
                'page': page,
                'total_pages': 0
            })
        
        return jsonify({
            'conversations': [conv.to_dict() for conv in conversations.items],
            'has_next': conversations.has_next,
            'has_prev': conversations.has_prev,
            'page': page,
            'total_pages': conversations.pages
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
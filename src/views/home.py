from flask import Blueprint, render_template

principal = Blueprint("inicio", __name__)

@principal.route("/")
def home():
    user_name = "Juan"
    return render_template('message.html', nombre=user_name) 
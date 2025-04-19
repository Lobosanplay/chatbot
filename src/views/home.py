from flask import Blueprint, render_template

principal = Blueprint("inicio", __name__)

@principal.route("/")
def home():
    user_name = "Juan"
    return render_template('main.html', nombre=user_name) 
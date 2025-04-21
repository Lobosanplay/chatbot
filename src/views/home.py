from flask import Blueprint, render_template

principal = Blueprint("inicio", __name__)

@principal.route("/")
def home():
    return render_template('message.html') 
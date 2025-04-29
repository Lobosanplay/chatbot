from flask import Blueprint, render_template, g


principal = Blueprint("inicio", __name__)

# creamos una instancia para home
@principal.route("/")
def home():
    return render_template('message.html', user=g.user) 